import {
  ListVerifyOtpCase,
  SendOtpCase,
  VerifyOtpCase,
} from "@/common/base/interfaces";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class ResendOtpRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  identifier: string;

  @ApiProperty({
    enum: ListVerifyOtpCase,
    description: "The case for which the OTP is being sent",
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(ListVerifyOtpCase)
  case: VerifyOtpCase;
}
