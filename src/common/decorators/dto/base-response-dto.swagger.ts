import { ApiProperty } from "@nestjs/swagger";

export class BaseResponse<T> {
  @ApiProperty({ example: "Success" })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    oneOf: [{ type: "object" }, { type: "array", items: { type: "object" } }],
  })
  data: T;
}
