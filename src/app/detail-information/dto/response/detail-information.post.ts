import { IDetailInformationEntity } from "@/entities/interface/auth/detail-information.entites.interface";
import { ApiProperty } from "@nestjs/swagger";

export class DetailInformationPostResponse
  implements Partial<IDetailInformationEntity> {}
