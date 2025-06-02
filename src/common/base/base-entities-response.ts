import { IBaseEntity } from "@/entities/interface/base/base.entities.interface";
import { ApiProperty } from "@nestjs/swagger";

export class BaseEntitiesResponse implements Partial<IBaseEntity> {
  @ApiProperty({})
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Boolean })
  isDeleted: boolean;
}
