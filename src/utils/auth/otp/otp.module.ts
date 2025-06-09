import { GmailModule } from "@/utils/gmail";
import { RedisModule } from "@/utils/redis";
import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { JwtModule } from "../jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "@/entities/entity/implement/auth";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    GmailModule,
    RedisModule,
    JwtModule,
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
