import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath, ApiExtraModels } from "@nestjs/swagger";
import { BaseResponseDto } from "./dto/base-response-dto";

export const ApiResponseWrapperSingle = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(BaseResponseDto, model),
    ApiOkResponse({
      description: "Success response with single object",
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
