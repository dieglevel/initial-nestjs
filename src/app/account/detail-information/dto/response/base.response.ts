import { BaseEntitiesResponse } from "@/common/base/base-entities-response.swagger";
import { IDetailInformationEntity } from "@/entities/interface/auth/detail-information.entity.interface";
import { CreateDetailInformationDto } from "../create-detail-information.dto";
import { IntersectionType } from "@nestjs/swagger";

export class DetailInformationResponse extends IntersectionType(
  BaseEntitiesResponse,
  CreateDetailInformationDto,
) {}
