import { IDetailInformationEntity } from "@/entities/interface/auth/detail-information.entity.interface";
import { ApiProperty } from "@nestjs/swagger";

export class DetailInformationPostResponse
  implements Partial<IDetailInformationEntity> {}
