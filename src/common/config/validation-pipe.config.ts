import { BadRequestException, ValidationPipe } from "@nestjs/common";

export const validatePipeConfig = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: false,
  transform: true,
  exceptionFactory: (errors) => {
    const messages = errors
      .map((err) => Object.values(err.constraints || {}).join(", "))
      .join("; ");
    return new BadRequestException(messages);
  },
});
