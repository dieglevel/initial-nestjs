import { HttpException } from "@nestjs/common";
import { MessageResponse } from "./interfaces";
import { BaseError } from "./base-error.base";

export enum MESSAGERESPONSE {
  CREATED = "Created successfully",
  UPDATED = "Updated successfully",
  DELETED = "Deleted successfully",
  QUERIED = "Query successfully",
}

export class BaseController {
  protected createSuccessResponse<T>(
    data: T,
    message?: string,
  ): MessageResponse {
    return {
      data: data,
      message: message ? message : MESSAGERESPONSE.CREATED,
      statusCode: 201,
    };
  }

  protected okResponse<T>(data: T, message?: string): MessageResponse {
    return {
      data: data,
      message: message ? message : MESSAGERESPONSE.UPDATED,
      statusCode: 200,
    };
  }

  protected handleResponse<T>(data: T, message = "Success"): MessageResponse {
    return {
      statusCode: 200,
      message,
      data,
    };
  }
}
