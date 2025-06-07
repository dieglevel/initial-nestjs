import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
import { RoleEntity } from "@/entities/entity/implement/auth/role.entity";
import { JwtModule } from "../../../utils/auth/jwt/jwt.module";
import { SessionModule } from "../../../utils/auth/session/session.module";
import { OtpService } from "../../../utils/auth/otp/otp.service";
import { RedisModule, RedisService } from "@/utils/redis";
import { GmailModule } from "@/utils/gmail/gmail.module";
import { GmailService } from "@/utils/gmail";
import { OtpModule } from "../../../utils/auth/otp/otp.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, RoleEntity]),
    JwtModule,
    SessionModule,
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
