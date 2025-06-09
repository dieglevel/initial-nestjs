import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { BaseEntitiesResponse } from "@/common/base";
import { IAccountEntity } from "@/entities/interface/auth";
import { CreateAccountRequest } from "../request";

export class CreateAccountResponse
  extends IntersectionType(
    OmitType(CreateAccountRequest, ["password"]),
    BaseEntitiesResponse,
  )
  implements Partial<IAccountEntity>
{
  @ApiProperty()
  otpToken: string;
}
