import { IDetailInformationEntity } from "@/entities/interface/auth";
import { ApiProperty } from "@nestjs/swagger";

export class DetailInformationPostResponse
  implements Partial<IDetailInformationEntity> {}
