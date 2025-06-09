import { BaseService } from "@/common/base";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService as JwtServiceNestJS } from "@nestjs/jwt";
import { IOtpPayload, IPayload } from "./payload";
import { SendOtpCase, VerifyOtpCase } from "@/common/base/interfaces";

@Injectable()
export class JwtService extends BaseService {
  constructor(private jwtService: JwtServiceNestJS) {
    super();
  }

  async generateToken(payloadData: Record<string, any>): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessTokenSync = this.jwtService.signAsync(payloadData);
    const refreshTokenSync = this.jwtService.signAsync(payloadData, {
      expiresIn: "30d",
    });
    const [accessToken, refreshToken] = await Promise.all([
      accessTokenSync,
      refreshTokenSync,
    ]);
    return { accessToken, refreshToken };
  }

  async verifyToken(token: string): Promise<IPayload> {
    try {
      return await this.jwtService.verifyAsync<IPayload>(token);
    } catch (error) {
      throw new UnauthorizedException("Token is invalid");
    }
  }

  async generateOtpToken(
    accountId: string,
    type: VerifyOtpCase,
  ): Promise<string> {
    const payloadData: Record<string, any> = {
      accountId: accountId,
      type: type,
    };

    const generateToken = this.jwtService.signAsync(payloadData, {
      expiresIn: "1m",
    });
    const [token] = await Promise.all([generateToken]);
    return token;
  }

  async verifyOtpToken(token: string): Promise<IOtpPayload> {
    try {
      return await this.jwtService.verifyAsync<IOtpPayload>(token);
    } catch (error) {
      throw new UnauthorizedException("Token is invalid");
    }
  }

  async generateOtpTokenSuccess(
    accountId: string,
    type: VerifyOtpCase,
  ): Promise<string> {
    const payloadData: Record<string, any> = {
      accountId: accountId,
      type: type,
    };

    const generateToken = this.jwtService.signAsync(payloadData, {
      expiresIn: "15m",
    });
    const [token] = await Promise.all([generateToken]);
    return token;
  }

  async verifyOtpTokenSuccess(token: string): Promise<IOtpPayload> {
    try {
      return await this.jwtService.verifyAsync<IOtpPayload>(token);
    } catch (error) {
      throw new UnauthorizedException("Token is invalid");
    }
  }
}
