import { PartialType } from "@nestjs/swagger";
import { CreateDetailInformationDto } from "./create-detail-information.dto";

export class UpdateDetailInformationDto extends PartialType(
  CreateDetailInformationDto,
) {}
