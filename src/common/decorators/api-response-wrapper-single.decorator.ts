import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath, ApiExtraModels } from "@nestjs/swagger";
import { BaseResponse } from "./dto";

export const ApiResponseWrapperSingle = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(BaseResponse, model),
    ApiOkResponse({
      description: "Success response with single object",
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
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
