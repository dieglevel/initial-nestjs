import { ApiProperty } from "@nestjs/swagger";

export class ValidationErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: "Bad Request" })
  error: string;

  @ApiProperty({
    type: String,
  })
  message: string;
}
