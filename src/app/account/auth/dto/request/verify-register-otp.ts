import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyRegisterOtpRequest {
  @ApiProperty({
    description: "The OTP code sent to the user's email",
    example: "123456",
  })
  @IsString()
  otp: string;
}
