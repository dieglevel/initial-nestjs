import { BaseService } from "@/common/base/base-service.base";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService as JwtServiceNestJS } from "@nestjs/jwt";
import { IPayload } from "./payload/payload.interface";

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
      //  this.UnauthorizedException("Token is invalid");
      throw new UnauthorizedException("Token is invalid");
    }
  }
}
