import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from "@nestjs/swagger";
import { CreateAccountDto } from "../create-account";
import { BaseEntitiesResponse } from "@/common/base/base-entities-response.swagger";
import { IAccountEntity } from "@/entities/interface/auth/account.entity.interface";

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
