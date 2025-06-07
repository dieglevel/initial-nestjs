import { ApiProperty } from "@nestjs/swagger";

export class BaseErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;
}

// 3xx Responses
export class MovedPermanentlyResponse extends BaseErrorResponse {
  @ApiProperty({ example: 301 })
  statusCode: number;

  @ApiProperty({ example: "Moved Permanently" })
  error: string;

  @ApiProperty({ example: "The resource has been moved permanently" })
  message: string;
}

export class FoundResponse extends BaseErrorResponse {
  @ApiProperty({ example: 302 })
  statusCode: number;

  @ApiProperty({ example: "Found" })
  error: string;

  @ApiProperty({ example: "The resource has been found" })
  message: string;
}

// 4xx Responses
export class BadRequestResponse extends BaseErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: "Bad Request" })
  error: string;

  @ApiProperty({ example: "Invalid request format" })
  message: string;
}

export class UnauthorizedResponse extends BaseErrorResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: "Unauthorized" })
  error: string;

  @ApiProperty({ example: "You are not authorized" })
  message: string;
}

export class ForbiddenResponse extends BaseErrorResponse {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: "Forbidden" })
  error: string;

  @ApiProperty({ example: "Access denied" })
  message: string;
}

export class NotFoundResponse extends BaseErrorResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: "Not Found" })
  error: string;

  @ApiProperty({ example: "Resource not found" })
  message: string;
}

export class MethodNotAllowedResponse extends BaseErrorResponse {
  @ApiProperty({ example: 405 })
  statusCode: number;

  @ApiProperty({ example: "Method Not Allowed" })
  error: string;

  @ApiProperty({ example: "This method is not allowed" })
  message: string;
}

export class NotAcceptableResponse extends BaseErrorResponse {
  @ApiProperty({ example: 406 })
  statusCode: number;

  @ApiProperty({ example: "Not Acceptable" })
  error: string;

  @ApiProperty({ example: "Cannot generate acceptable response" })
  message: string;
}

export class RequestTimeoutResponse extends BaseErrorResponse {
  @ApiProperty({ example: 408 })
  statusCode: number;

  @ApiProperty({ example: "Request Timeout" })
  error: string;

  @ApiProperty({ example: "The request timed out" })
  message: string;
}

export class ConflictResponse extends BaseErrorResponse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: "Conflict" })
  error: string;

  @ApiProperty({ example: "Resource already exists" })
  message: string;
}

export class PreconditionFailedResponse extends BaseErrorResponse {
  @ApiProperty({ example: 412 })
  statusCode: number;

  @ApiProperty({ example: "Precondition Failed" })
  error: string;

  @ApiProperty({ example: "Precondition for request failed" })
  message: string;
}

export class TooManyRequestsResponse extends BaseErrorResponse {
  @ApiProperty({ example: 429 })
  statusCode: number;

  @ApiProperty({ example: "Too Many Requests" })
  error: string;

  @ApiProperty({ example: "Rate limit exceeded" })
  message: string;
}

export class GoneResponse extends BaseErrorResponse {
  @ApiProperty({ example: 410 })
  statusCode: number;

  @ApiProperty({ example: "Gone" })
  error: string;

  @ApiProperty({ example: "Resource is no longer available" })
  message: string;
}

export class PayloadTooLargeResponse extends BaseErrorResponse {
  @ApiProperty({ example: 413 })
  statusCode: number;

  @ApiProperty({ example: "Payload Too Large" })
  error: string;

  @ApiProperty({ example: "The request is too large" })
  message: string;
}

export class UnsupportedMediaTypeResponse extends BaseErrorResponse {
  @ApiProperty({ example: 415 })
  statusCode: number;

  @ApiProperty({ example: "Unsupported Media Type" })
  error: string;

  @ApiProperty({ example: "Media type is not supported" })
  message: string;
}

export class UnprocessableEntityResponse extends BaseErrorResponse {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({ example: "Unprocessable Entity" })
  error: string;

  @ApiProperty({ example: "Validation failed" })
  message: string;
}

// 5xx Responses
export class InternalServerErrorResponse extends BaseErrorResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: "Internal Server Error" })
  error: string;

  @ApiProperty({ example: "Unexpected server error" })
  message: string;
}

export class NotImplementedResponse extends BaseErrorResponse {
  @ApiProperty({ example: 501 })
  statusCode: number;

  @ApiProperty({ example: "Not Implemented" })
  error: string;

  @ApiProperty({ example: "This functionality is not yet implemented" })
  message: string;
}

export class BadGatewayResponse extends BaseErrorResponse {
  @ApiProperty({ example: 502 })
  statusCode: number;

  @ApiProperty({ example: "Bad Gateway" })
  error: string;

  @ApiProperty({ example: "Invalid response from upstream server" })
  message: string;
}

export class ServiceUnavailableResponse extends BaseErrorResponse {
  @ApiProperty({ example: 503 })
  statusCode: number;

  @ApiProperty({ example: "Service Unavailable" })
  error: string;

  @ApiProperty({ example: "Server is currently unavailable" })
  message: string;
}

export class GatewayTimeoutResponse extends BaseErrorResponse {
  @ApiProperty({ example: 504 })
  statusCode: number;

  @ApiProperty({ example: "Gateway Timeout" })
  error: string;

  @ApiProperty({ example: "Upstream server timed out" })
  message: string;
}

export class DefaultErrorResponse extends BaseErrorResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: "Internal Server Error" })
  error: string;

  @ApiProperty({ example: "An unexpected error occurred" })
  message: string;
}
