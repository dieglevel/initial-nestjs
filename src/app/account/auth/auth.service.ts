import { BaseService } from "@/common/base";
import { JwtService } from "@/utils/auth/jwt";
import { OtpService } from "@/utils/auth/otp";
import { SessionService } from "@/utils/auth/session";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { REGEX_EMAIL } from "@/common/validate";

import {
  CreateAccountRequest,
  ResendOtpRequest,
  VerifyForgotPasswordOtpRequest,
  VerifyOtpRequest,
  VerifyRegisterOtpRequest,
} from "./dto/request";
import {
  AccountEntity,
  DetailInformationEntity,
  RoleEntity,
} from "@/entities/entity/implement/auth";
import {
  CreateAccountResponse,
  ResendOtpResponse,
  VerifyForgotPasswordOtpResponse,
  VerifyOtpResponse,
  VerifyRegisterOtpResponse,
} from "./dto";
import { generatePassword } from "@/utils/password/generate-password";
import { RedisService } from "@/utils/redis";
import { ROLE_ENUM } from "@/entities/enum";

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    private readonly sessionService: SessionService,

    private entityManager: EntityManager,
    private jwtService: JwtService,
    private otpService: OtpService,
    private redisService: RedisService,
  ) {
    super();
  }

  public async register(
    dto: CreateAccountRequest,
  ): Promise<CreateAccountResponse> {
    try {
      // ! STAGE 1: Check if email or username already exists

      if (dto?.email && REGEX_EMAIL.test(dto.email)) {
        const foundAccountByEmail = await this.accountRepository.findOne({
          where: { email: dto.email },
        });

        const foundAccountByUsername = await this.accountRepository.findOne({
          where: { username: dto.username },
        });

        const foundAccount = foundAccountByEmail || foundAccountByUsername;

        // ! STAGE 2: If account exists, throw conflict exception
        if (foundAccount != null) {
          this.ConflictException("This account existed");
        } else {
          const passwordHashed = await generatePassword(dto.password);

          const accountModel = this.accountRepository.create({
            ...dto,
            isVerify: false, //NOTE xóa khi đưa lên production
            isActive: false, // NOTE : xóa khi đưa lên production
            password: passwordHashed,
          });

          const account = await this.registerTransaction(accountModel);

          // ! STAGE 3: Send OTP to email
          const statusSendEmail = await this.otpService.sendOTP({
            accountId: account.id,
            case: "register",
            typeSend: "gmail",
          });

          if (!statusSendEmail) {
            this.BadRequestException("Failed to send OTP");
          }
          const response: CreateAccountResponse = {
            id: account.id,
            email: account.email,
            username: account.username,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
            isDeleted: account.isDeleted,
            otpToken: statusSendEmail,
          };

          if (!statusSendEmail) {
            this.BadRequestException("Failed to send OTP");
          }

          return response;
        }
      } else {
        this.BadRequestException("Wrong format email");
      }
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async registerTransaction(
    accountModel: AccountEntity,
  ): Promise<AccountEntity> {
    return await this.entityManager.transaction(
      async (entityManager: EntityManager) => {
        const role = await this.roleRepository.findOne({
          where: { name: ROLE_ENUM.CUSTOMER },
        });

        if (!role) {
          this.NotFoundException("Role not found");
        }

        const accountCreate = entityManager.save(AccountEntity, {
          ...accountModel,
          role: role,
        });

        const detailInformation = entityManager.save(DetailInformationEntity, {
          account: await accountCreate,
        });

        return accountCreate;
      },
    );
  }

  async resendOtp(dto: ResendOtpRequest): Promise<ResendOtpResponse> {
    try {
      const account = await this.accountRepository.findOne({
        where: [{ email: dto.identifier }, { username: dto.identifier }],
      });

      if (!account) {
        this.NotFoundException("Account not found");
      }

      const removeOtp = await this.otpService.removeOtp({
        accountId: account.id,
        case: dto.case,
      });

      if (!removeOtp) {
        this.BadRequestException("Failed to remove existing OTP");
      }

      const otp = await this.otpService.sendOTP({
        accountId: account.id,
        case: dto.case,
        typeSend: "gmail",
      });

      if (!otp) {
        this.BadRequestException("Failed to send OTP");
      }

      return {
        otpToken: otp,
      };
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async verifyOtp(
    authHeader: string,
    dto: VerifyOtpRequest,
  ): Promise<VerifyOtpResponse> {
    try {
      const isVerify = await this.otpService.verifyOtp(authHeader, dto.otp);

      if (!isVerify) {
        this.UnauthorizedException("Invalid OTP token");
      }

      const payload = await this.jwtService.verifyOtpToken(authHeader);

      const account = await this.accountRepository.findOne({
        where: { id: payload.accountId },
      });

      if (!account) {
        this.NotFoundException("Account not found");
      }
      if (payload.type === "register") {
        await this.accountRepository.save({
          ...account,
          isVerify: true,
          isActive: true,
        });
        return {
          otpTokenSuccess: "",
        };
      }

      const otpTokenSuccess = await this.otpService.generateSuccessOtpToken(
        account.id,
        payload.type,
      );

      return {
        otpTokenSuccess: otpTokenSuccess,
      };
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async verifyForgotPasswordOtp(
    authHeader: string,
    dto: VerifyForgotPasswordOtpRequest,
  ): Promise<VerifyForgotPasswordOtpResponse> {
    try {
      const payload = await this.jwtService.verifyOtpTokenSuccess(authHeader);

      const verify = await this.otpService.verifySuccessOtpToken(authHeader);

      if (!verify) {
        this.UnauthorizedException("Invalid OTP token");
      }

      if (!payload) {
        this.UnauthorizedException("Invalid Token");
      }

      const account = await this.accountRepository.findOne({
        where: { id: payload.accountId },
      });
      if (!account) {
        this.NotFoundException("Account not found");
      }

      if (dto.password !== dto.repassword) {
        this.BadRequestException("Password and Repassword do not match");
      }

      // Update account password
      await this.accountRepository.save({
        ...account,
        password: await generatePassword(dto.password),
      });

      return {
        success: true,
      };
    } catch (error) {
      this.ThrowError(error);
    }
  }
}
