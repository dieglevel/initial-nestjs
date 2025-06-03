import { ApiProperty } from "@nestjs/swagger";

export class MessageResponse<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data: T;
}
