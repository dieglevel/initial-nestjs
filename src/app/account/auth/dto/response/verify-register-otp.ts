import { ApiProperty } from "@nestjs/swagger";

export class VerifyRegisterOtpResponse {
  @ApiProperty()
  success: boolean;
}
