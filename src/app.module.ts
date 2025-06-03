import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "./common/config";
import { DatabaseModule } from "./common/database";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailInformationModule } from "./app/detail-information/detail-information.module";
import { LoggerMiddleware } from "./common/middleware";

@Module({
  imports: [
    ConfigModule,
    AppModule,
    DatabaseModule,
    TypeOrmModule.forFeature([]),
    DetailInformationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*path");
  }
}
