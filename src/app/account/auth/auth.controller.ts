import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { CreateAccountDto } from "./dto/create-account";
import { ApiResponseWrapperSingle } from "@/common/decorators/api-response-wrapper-single.decorator";
import { CreateAccountResponse } from "./dto/response/create-account.response";
import { BadRequestResponse, ConflictResponse } from "@/common/base";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiResponseWrapperSingle(CreateAccountResponse)
  @ApiBadRequestResponse({
    description: "Failed to create account.",
    type: BadRequestResponse,
  })
  @ApiConflictResponse({
    description: "Account already exists.",
    type: ConflictResponse,
  })
  public async register(@Body() dataRegister: CreateAccountDto) {
    return await this.authService.register(dataRegister);
  }
}
