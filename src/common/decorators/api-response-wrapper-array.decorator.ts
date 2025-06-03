import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath, ApiExtraModels } from "@nestjs/swagger";
import { BaseResponseDto } from "./dto/base-response-dto";

export const ApiResponseWrapperArray = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(BaseResponseDto, model),
    ApiOkResponse({
      description: "Success response with array of objects",
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
