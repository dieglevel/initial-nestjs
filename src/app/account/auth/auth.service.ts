import { BaseService } from "@/common/base";
import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
import { JwtService } from "@/utils/auth/jwt";
import { OtpService } from "@/utils/auth/otp";
import { SessionService } from "@/utils/auth/session";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { CreateAccountDto } from "./dto/create-account";
import { CreateAccountResponse } from "./dto/response";
import { REGEX_EMAIL } from "@/common/validate";
import * as bcrypt from "bcrypt";
import { SendOtpCase, VerifyOtpCase } from "@/common/base/interfaces";
import { CurrentUserDto } from "@/common/base/types";

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    private readonly sessionService: SessionService,

    private entityManager: EntityManager,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {
    super();
  }

  public async register(
    createAuthDto: CreateAccountDto,
  ): Promise<CreateAccountResponse> {
    try {
      // ! STAGE 1: Check if email or username already exists

      if (createAuthDto?.email && REGEX_EMAIL.test(createAuthDto.email)) {
        const foundAccountByEmail = await this.accountRepository.findOne({
          where: { email: createAuthDto.email },
        });

        const foundAccountByUsername = await this.accountRepository.findOne({
          where: { username: createAuthDto.username },
        });

        const foundAccount = foundAccountByEmail || foundAccountByUsername;

        // ! STAGE 2: If account exists, throw conflict exception
        if (foundAccount != null) {
          this.ConflictException("This account existed");
        } else {
          const salt = await bcrypt.genSalt(10);
          const passwordHashed = await bcrypt.hash(
            createAuthDto.password,
            salt,
          );

          const accountModel = this.accountRepository.create({
            ...createAuthDto,
            isVerify: false, //NOTE xóa khi đưa lên production
            isActive: false, // NOTE : xóa khi đưa lên production
            password: passwordHashed,
          });

          const account = await this.registerTransaction(accountModel);

          // ! STAGE 3: Send OTP to email
          const statusSendEmail = await this.otpService.sendOTP({
            account: account,
            case: "register",
            typeSend: "gmail",
          });

          if (!statusSendEmail) {
            this.BadGatewayException("Failed to send OTP");
          }
          const response: CreateAccountResponse = {
            id: account.id,
            email: account.email,
            username: account.username,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
            isDeleted: account.isDeleted,
          };

          const statusSendOtp = await this.otpService.sendOTP({
            account: account,
            case: "register",
            typeSend: "gmail",
          });

          if (!statusSendOtp) {
            this.BadGatewayException("Failed to send OTP");
          }

          return response;
        }
      } else {
        this.BadGatewayException("Wrong format email");
      }
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async registerTransaction(
    accountModel: AccountEntity,
  ): Promise<AccountEntity> {
    return await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const account = await transactionalEntityManager.save(accountModel);
        return account;
      },
    );
  }

  // async sendOtp(
  //   user: CurrentUserDto,
  //   forFeature: VerifyOtpCase,
  //   otp: string,
  // ): Promise<string> {
  //   try {
  //     const account = await this.accountRepository.findOne({
  //       where: { id: user.id },
  //     });
  //     if (!account) {
  //       this.NotFoundException("Account not found");
  //     }
  //     await this.otpService.verifyOtp({
  //       case: forFeature,
  //       otp: otp,
  //       account: account,
  //     });
  //     return "OTP sent successfully";
  //   } catch (error) {
  //     this.ThrowError(error);
  //   }
  // }

  async verifyOtp(
    user: CurrentUserDto,
    forFeature: VerifyOtpCase,
    type: SendOtpCase,
  ): Promise<string> {
    try {
      const account = await this.accountRepository.findOne({
        where: { id: user.id },
      });
      if (!account) {
        this.NotFoundException("Account not found");
      }
      const otp = await this.otpService.sendOTP({
        account: account,
        case: forFeature,
        typeSend: type,
      });
      return "OTP sent successfully";
    } catch (error) {
      this.ThrowError(error);
    }
  }
}
