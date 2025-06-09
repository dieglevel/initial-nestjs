import { ApiProperty } from "@nestjs/swagger";

export class VerifyForgotPasswordOtpResponse {
  @ApiProperty()
  success: boolean;
}
