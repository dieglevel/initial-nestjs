import { Module } from "@nestjs/common";
import { ConfigModule } from "./common/config";
import { DatabaseModule } from "./common/database";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailInformationModule } from "./app/detail-information/detail-information.module";

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
export class AppModule {}
