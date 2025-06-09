import { ListVerifyOtpCase, VerifyOtpCase } from "@/common/base/interfaces";
import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpDto {
  @IsString()
  otp: string;
}
