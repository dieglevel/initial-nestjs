import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { CreateAccountDto } from "../create-account";
import { BaseEntitiesResponse } from "@/common/base";
import { IAccountEntity } from "@/entities/interface/auth";

export class CreateAccountResponse
  extends IntersectionType(
    OmitType(CreateAccountDto, ["password"]),
    BaseEntitiesResponse,
  )
  implements Partial<IAccountEntity>
{
  @ApiProperty()
  isVerify: boolean;

  @ApiProperty()
  isActive: boolean;
}
