import { ApiProperty } from "@nestjs/swagger";

export class ResendOtpResponse {
  @ApiProperty()
  otpToken: string;
}
