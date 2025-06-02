import { Module } from "@nestjs/common";
import { DetailInformationService } from "./detail-information.service";
import { DetailInformationController } from "./detail-information.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailInformationEntity } from "@/entities/auth/detail-information.entites";

@Module({
  imports: [TypeOrmModule.forFeature([DetailInformationEntity])],
  controllers: [DetailInformationController],
  providers: [DetailInformationService],
})
export class DetailInformationModule {}
