import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "./common/config";
import { DatabaseModule } from "./common/database";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerMiddleware } from "./common/middleware";
import { DetailInformationModule } from "./app/auth/detail-information";
import { AuthModule } from "./app/auth/auth/auth.module";

@Module({
  imports: [
    ConfigModule,
    AppModule,
    DatabaseModule,
    TypeOrmModule.forFeature([]),
    DetailInformationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*path");
  }
}
