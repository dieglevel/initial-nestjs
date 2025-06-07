import { BaseEntitiesResponse } from "@/common/base";
import { CreateDetailInformationDto } from "../create-detail-information.dto";
import { IntersectionType } from "@nestjs/swagger";

export class DetailInformationResponse extends IntersectionType(
  BaseEntitiesResponse,
  CreateDetailInformationDto,
) {}
