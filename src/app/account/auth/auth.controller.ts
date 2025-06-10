import { Body, Controller, Headers, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiHeader,
} from "@nestjs/swagger";
import { BadRequestResponse, ConflictResponse } from "@/common/base";
import { ApiResponseWrapperSingle } from "@/common/decorators";
import {
  CreateAccountRequest,
  CreateAccountResponse,
  LoginRequest,
  LoginResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  VerifyForgotPasswordOtpRequest,
  VerifyForgotPasswordOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./dto";

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
  @HttpCode(200)
  public async register(
    @Body() dataRegister: CreateAccountRequest,
  ): Promise<CreateAccountResponse> {
    return await this.authService.register(dataRegister);
  }

  @Post("resend-otp")
  @ApiResponseWrapperSingle(ResendOtpResponse)
  @HttpCode(200)
  public async resendOtp(@Body() resendOtp: ResendOtpRequest) {
    return await this.authService.resendOtp(resendOtp);
  }

  @Post("verify-otp")
  @ApiResponseWrapperSingle(VerifyOtpResponse)
  @ApiHeader({
    name: "OtpToken",
    description: "Token for otp verification, no start with Bearer",
    required: true,
  })
  @HttpCode(200)
  public async verifyOtp(
    @Headers("OtpToken") authHeader: string,
    @Body() verifyOtp: VerifyOtpRequest,
  ) {
    return await this.authService.verifyOtp(authHeader, verifyOtp);
  }

  @Post("verify-forgot-password-otp")
  @ApiResponseWrapperSingle(VerifyForgotPasswordOtpResponse)
  @ApiHeader({
    name: "OtpToken",
    description: "Token for otp verification, no start with Bearer",
    required: true,
  })
  @HttpCode(200)
  public async verifyForgotPasswordOtp(
    @Headers("OtpToken") authHeader: string,
    @Body() verifyOtp: VerifyForgotPasswordOtpRequest,
  ) {
    return await this.authService.verifyForgotPasswordOtp(
      authHeader,
      verifyOtp,
    );
  }

  @Post("login")
  @ApiResponseWrapperSingle(LoginResponse)
  public async login(
    @Body() loginRequest: LoginRequest,
  ): Promise<LoginResponse> {
    return await this.authService.login(loginRequest);
  }
}
