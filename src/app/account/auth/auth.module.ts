import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AccountEntity,
  RoleEntity,
  SessionEntity,
} from "@/entities/entity/implement/auth";
import { JwtModule } from "@/utils/auth/jwt";
import { SessionModule } from "@/utils/auth/session";
import { OtpModule } from "@/utils/auth/otp";
import { RedisModule } from "@/utils/redis";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, RoleEntity, SessionEntity]),
    JwtModule,
    SessionModule,
    OtpModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
