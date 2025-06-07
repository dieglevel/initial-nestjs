import { GmailModule } from "@/utils/gmail";
import { RedisModule } from "@/utils/redis";
import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";

@Module({
  imports: [GmailModule, RedisModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
