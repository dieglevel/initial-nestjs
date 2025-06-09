import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpResponse {
  @ApiProperty()
  otpTokenSuccess: string;
}
