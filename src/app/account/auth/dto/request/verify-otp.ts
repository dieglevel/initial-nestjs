import { ListVerifyOtpCase, VerifyOtpCase } from "@/common/base/interfaces";
import { VerifyOtpDto } from "@/utils/auth/otp/dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The OTP code",
    example: "123456",
  })
  otp: string;
}
