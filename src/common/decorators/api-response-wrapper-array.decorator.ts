import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath, ApiExtraModels } from "@nestjs/swagger";
import { BaseResponse } from "./dto";

export const ApiResponseWrapperArray = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(BaseResponse, model),
    ApiOkResponse({
      description: "Success response with array of objects",
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
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
