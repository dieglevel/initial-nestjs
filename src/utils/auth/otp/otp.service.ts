import { JwtService } from "@/utils/auth/jwt";
import { BaseService } from "@/common/base";
import { VerifyOtpCase } from "@/common/base/interfaces";
import { GmailService } from "@/utils/gmail";
import { RedisService } from "@/utils/redis";
import { Injectable } from "@nestjs/common";
import { SendOTPDto, VerifyOtpDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "@/entities/entity/implement/auth";
import { Repository } from "typeorm";

@Injectable()
export class OtpService extends BaseService {
  constructor(
    private readonly gmailService: GmailService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,

    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super();
  }

  async sendOTP(dto: SendOTPDto): Promise<string> {
    try {
      const { typeSend, accountId, case: otpCase } = dto;
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const token = await this.jwtService.generateOtpToken(accountId, dto.case);

      switch (typeSend) {
        case "gmail":
          await this.gmailService.sendUserConfirmation(accountId, otp);
          await this.saveOtp(accountId, otp, otpCase, 1 * 60);
          return token;
      }
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async verifyOtp(authHeader: string, otp: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyOtpToken(authHeader);

      if (!payload) {
        this.UnauthorizedException("Invalid OTP token");
      }

      const savedOtp = await this.getSavedOtp(payload.accountId, payload.type);
      if (!savedOtp || savedOtp !== otp) {
        this.UnauthorizedException("Invalid OTP token");
      }

      await this.deleteOtp(payload.accountId, payload.type);

      return true;
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async removeOtp(dto: {
    accountId: string;
    case: VerifyOtpCase;
  }): Promise<boolean> {
    try {
      const { accountId, case: otpCase } = dto;

      const oldToken = await this.getSavedOtp(accountId, otpCase);
      if (oldToken) {
        this.BadRequestException("It's not time to resend the OTP yet");
      }

      await this.deleteOtp(accountId, otpCase);
      return true;
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async generateSuccessOtpToken(
    accountId: string,
    otpCase: VerifyOtpCase,
  ): Promise<string> {
    try {
      const token = await this.jwtService.generateOtpTokenSuccess(
        accountId,
        otpCase,
      );

      await this.saveOtp(accountId, "success", otpCase, 1 * 60 * 15);

      return token;
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async verifySuccessOtpToken(
    authHeader: string,
  ): Promise<{ accountId: string; type: VerifyOtpCase }> {
    try {
      const payload = await this.jwtService.verifyOtpTokenSuccess(authHeader);

      if (!payload) {
        this.UnauthorizedException("Invalid OTP token");
      }

      const savedOtp = await this.getSavedOtp(payload.accountId, payload.type);

      if (!savedOtp) {
        this.UnauthorizedException("OTP token has expired or is invalid");
      }

      if (savedOtp !== "success") {
        this.UnauthorizedException("Invalid OTP token");
      }

      await this.deleteOtp(payload.accountId, payload.type);

      return payload;
    } catch (error) {
      this.ThrowError(error);
    }
  }

  private async saveOtp(
    userId: string,
    otp: string,
    otpCase: VerifyOtpCase,
    time: number,
  ) {
    const key = `otp:${otpCase}:${userId}`;
    await this.redisService.set(key, otp, time);
  }

  private async getSavedOtp(userId: string, otpCase: VerifyOtpCase) {
    const key = `otp:${otpCase}:${userId}`;
    return await this.redisService.get(key);
  }

  private async deleteOtp(userId: string, otpCase: VerifyOtpCase) {
    const key = `otp:${otpCase}:${userId}`;
    await this.redisService.delete(key);
  }
}
