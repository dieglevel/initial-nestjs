import {
  ListSendOtpCase,
  ListVerifyOtpCase,
  SendOtpCase,
  VerifyOtpCase,
} from "@/common/base/interfaces/otp.interface";
import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class SendOTPDto {
  @IsIn(ListSendOtpCase)
  typeSend: SendOtpCase;

  @IsNotEmpty()
  account: AccountEntity;

  @IsIn(ListVerifyOtpCase)
  case: VerifyOtpCase;
}
