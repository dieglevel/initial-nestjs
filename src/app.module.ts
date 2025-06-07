import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "./common/config";
import { DatabaseModule } from "./common/database";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerMiddleware } from "./common/middleware";
import { DetailInformationModule } from "./app/account/detail-information";
import { AuthModule } from "./app/account/auth/auth.module";
import { RedisModule } from "./utils/redis";
import { GmailModule } from "./utils/gmail/gmail.module";
import { OtpModule } from "./utils/auth/otp/otp.module";
import { SessionModule } from "./utils/auth/session/session.module";
import { JwtModule } from "./utils/auth/jwt/jwt.module";

@Module({
  imports: [
    ConfigModule,
    AppModule,
    DatabaseModule,
    // TypeOrmModule.forFeature([]),
    DetailInformationModule,
    AuthModule,
    RedisModule,
    GmailModule,
    OtpModule,
    SessionModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*path");
  }
}
