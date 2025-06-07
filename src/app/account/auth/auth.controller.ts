import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBadRequestResponse, ApiConflictResponse } from "@nestjs/swagger";
import { BadRequestResponse, ConflictResponse } from "@/common/base";
import { CreateAccountResponse } from "./dto/response";
import { ApiResponseWrapperSingle } from "@/common/decorators";
import { CreateAccountDto } from "./dto";

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
  public async register(
    @Body() dataRegister: CreateAccountDto,
  ): Promise<CreateAccountResponse> {
    return await this.authService.register(dataRegister);
  }
}
