import { HttpException } from "@nestjs/common";

export class BaseError extends HttpException {
  constructor(error: string, status: number, message: string) {
    super({ error, message, statusCode: status }, status);
  }
}
