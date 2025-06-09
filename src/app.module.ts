import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "./common/config";
import { DatabaseModule } from "./common/database";
import { LoggerMiddleware } from "./common/middleware";
import { DetailInformationModule } from "./app/account/detail-information";
import { RedisModule } from "./utils/redis";
import { SessionModule } from "./utils/auth/session/session.module";
import { AuthModule } from "./app/account/auth";
import { GmailModule } from "./utils/gmail";
import { OtpModule } from "./utils/auth/otp";
import { JwtModule } from "@nestjs/jwt";
import { RunSeederService } from "./seeders/run-seeder.service";
import { RoleSeeder } from "./seeders/implement";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AccountEntity,
  DetailInformationEntity,
  RoleEntity,
  SessionEntity,
} from "./entities/entity/implement/auth";

@Module({
  imports: [
    ConfigModule,
    AppModule,
    DatabaseModule,
    TypeOrmModule.forFeature([
      AccountEntity,
      DetailInformationEntity,
      RoleEntity,
      SessionEntity,
    ]),
    DetailInformationModule,
    AuthModule,
    RedisModule,
    GmailModule,
    OtpModule,
    SessionModule,
    JwtModule,
  ],
  controllers: [],
  providers: [RunSeederService, RoleSeeder],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*path");
  }
}
