import { Module } from "@nestjs/common";
import { DetailInformationService } from "./detail-information.service";
import { DetailInformationController } from "./detail-information.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailInformationEntity } from "@/entities/entity/implement/auth/detail-information.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DetailInformationEntity])],
  controllers: [DetailInformationController],
  providers: [DetailInformationService],
  exports: [DetailInformationService],
})
export class DetailInformationModule {}
