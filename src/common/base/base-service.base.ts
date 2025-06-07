import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseError } from "./base-error.base";

export class BaseService {
  protected BadRequestException(message: string): never {
    throw new BaseError("BadRequestException", HttpStatus.BAD_REQUEST, message);
  }

  protected UnauthorizedException(message: string): never {
    throw new BaseError(
      "UnauthorizedException",
      HttpStatus.UNAUTHORIZED,
      message,
    );
  }

  protected PaymentRequiredException(message: string): never {
    throw new BaseError(
      "PaymentRequiredException",
      HttpStatus.PAYMENT_REQUIRED,
      message,
    );
  }

  protected ForbiddenException(message: string): never {
    throw new BaseError("ForbiddenException", HttpStatus.FORBIDDEN, message);
  }

  protected NotFoundException(message: string): never {
    throw new BaseError("NotFoundException", HttpStatus.NOT_FOUND, message);
  }

  protected MethodNotAllowedException(message: string): never {
    throw new BaseError(
      "MethodNotAllowedException",
      HttpStatus.METHOD_NOT_ALLOWED,
      message,
    );
  }

  protected NotAcceptableException(message: string): never {
    throw new BaseError(
      "NotAcceptableException",
      HttpStatus.NOT_ACCEPTABLE,
      message,
    );
  }

  protected ProxyAuthenticationRequiredException(message: string): never {
    throw new BaseError(
      "ProxyAuthenticationRequiredException",
      HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
      message,
    );
  }

  protected RequestTimeoutException(message: string): never {
    throw new BaseError(
      "RequestTimeoutException",
      HttpStatus.REQUEST_TIMEOUT,
      message,
    );
  }

  protected ConflictException(message: string): never {
    throw new BaseError("ConflictException", HttpStatus.CONFLICT, message);
  }

  protected GoneException(message: string): never {
    throw new BaseError("GoneException", HttpStatus.GONE, message);
  }

  protected LengthRequiredException(message: string): never {
    throw new BaseError(
      "LengthRequiredException",
      HttpStatus.LENGTH_REQUIRED,
      message,
    );
  }

  protected PreconditionFailedException(message: string): never {
    throw new BaseError(
      "PreconditionFailedException",
      HttpStatus.PRECONDITION_FAILED,
      message,
    );
  }

  protected PayloadTooLargeException(message: string): never {
    throw new BaseError(
      "PayloadTooLargeException",
      HttpStatus.PAYLOAD_TOO_LARGE,
      message,
    );
  }

  protected URITooLongException(message: string): never {
    throw new BaseError(
      "URITooLongException",
      HttpStatus.URI_TOO_LONG,
      message,
    );
  }

  protected UnsupportedMediaTypeException(message: string): never {
    throw new BaseError(
      "UnsupportedMediaTypeException",
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      message,
    );
  }

  protected RequestedRangeNotSatisfiableException(message: string): never {
    throw new BaseError(
      "RequestedRangeNotSatisfiableException",
      HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
      message,
    );
  }

  protected ExpectationFailedException(message: string): never {
    throw new BaseError(
      "ExpectationFailedException",
      HttpStatus.EXPECTATION_FAILED,
      message,
    );
  }

  protected ImATeapotException(message: string): never {
    throw new BaseError(
      "ImATeapotException",
      HttpStatus.I_AM_A_TEAPOT,
      message,
    );
  }

  protected MisdirectedRequestException(message: string): never {
    throw new BaseError(
      "MisdirectedRequestException",
      HttpStatus.MISDIRECTED,
      message,
    );
  }

  protected UnprocessableEntityException(message: string): never {
    throw new BaseError(
      "UnprocessableEntityException",
      HttpStatus.UNPROCESSABLE_ENTITY,
      message,
    );
  }

  protected FailedDependencyException(message: string): never {
    throw new BaseError(
      "FailedDependencyException",
      HttpStatus.FAILED_DEPENDENCY,
      message,
    );
  }

  protected PreconditionRequiredException(message: string): never {
    throw new BaseError(
      "PreconditionRequiredException",
      HttpStatus.PRECONDITION_REQUIRED,
      message,
    );
  }

  protected TooManyRequestsException(message: string): never {
    throw new BaseError(
      "TooManyRequestsException",
      HttpStatus.TOO_MANY_REQUESTS,
      message,
    );
  }

  protected InternalServerErrorException(message: string): never {
    throw new BaseError(
      "InternalServerErrorException",
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    );
  }

  protected NotImplementedException(message: string): never {
    throw new BaseError(
      "NotImplementedException",
      HttpStatus.NOT_IMPLEMENTED,
      message,
    );
  }

  protected BadGatewayException(message: string): never {
    throw new BaseError("BadGatewayException", HttpStatus.BAD_GATEWAY, message);
  }

  protected ServiceUnavailableException(message: string): never {
    throw new BaseError(
      "ServiceUnavailableException",
      HttpStatus.SERVICE_UNAVAILABLE,
      message,
    );
  }

  protected GatewayTimeoutException(message: string): never {
    throw new BaseError(
      "GatewayTimeoutException",
      HttpStatus.GATEWAY_TIMEOUT,
      message,
    );
  }

  protected HTTPVersionNotSupportedException(message: string): never {
    throw new BaseError(
      "HTTPVersionNotSupportedException",
      HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
      message,
    );
  }

  protected ThrowError(error: any): never {
    console.log("Error", error);
    if (error instanceof HttpException) {
      const response = error.getResponse() as unknown as {
        error: string;
        message: string;
      };
      throw new BaseError(response.error, error.getStatus(), response.message);
    } else {
      throw new BaseError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        error?.message ? error.message : "Unknow Error",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        error?.http_code ? error.http_code : 500,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        error?.name ? error.name : "Unknow error, pls check log server",
      );
    }
  }
}
