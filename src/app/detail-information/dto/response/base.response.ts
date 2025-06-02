import { BaseEntitiesResponse } from "@/common/base/base-entities-response";
import { IDetailInformationEntity } from "@/entities/interface/auth/detail-information.entites.interface";
import { CreateDetailInformationDto } from "../create-detail-information.dto";
import { IntersectionType } from "@nestjs/swagger";

export class DetailInformationResponse extends IntersectionType(
  BaseEntitiesResponse,
  CreateDetailInformationDto,
) {}
