import { BaseService } from "@/common/base";
import { VerifyOtpCase } from "@/common/base/interfaces";
import { GmailService } from "@/utils/gmail";
import { RedisService } from "@/utils/redis";
import { Injectable } from "@nestjs/common";
import { SendOTPDto, VerifyOtpDto } from "./dto";

@Injectable()
export class OtpService extends BaseService {
  constructor(
    private readonly gmailService: GmailService,
    private readonly redisService: RedisService,
  ) {
    super();
  }

  async sendOTP(dto: SendOTPDto) {
    try {
      const { typeSend, account, case: otpCase } = dto;
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      switch (typeSend) {
        case "gmail":
          await this.gmailService.sendUserConfirmation(account, otp);
          await this.saveOtp(account.id, otp, otpCase);
          return true;
      }
    } catch (error) {
      this.BadGatewayException("Failed to send OTP");
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const { account, otp, case: otpCase } = dto;

      const savedOtp = await this.getSavedOtp(account.id, otpCase);
      if (!savedOtp || savedOtp !== otp) {
        this.BadGatewayException("Failed to verify OTP");
      }

      await this.deleteOtp(account.id, otpCase);

      return true;
    } catch (error) {
      this.BadGatewayException("Failed to verify OTP");
    }
  }

  private async saveOtp(userId: string, otp: string, otpCase: VerifyOtpCase) {
    const key = `otp:${otpCase}:${userId}`;
    await this.redisService.set(key, otp, 1 * 60);
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
