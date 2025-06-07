/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { BaseService } from "../base";
import { JwtService } from "@/utils/auth/jwt";
import { IPayload } from "@/utils/auth/jwt/payload";
import { CurrentUserDto } from "../base/types";

@Injectable()
export class CurrentUserInterceptor
  extends BaseService
  implements NestInterceptor
{
  constructor(@Inject() private readonly jwtService: JwtService) {
    super();
  }
  async intercept(context: ExecutionContext, next: CallHandler) {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request.headers.authorization.split(" ")[1];
      const payload: IPayload = await this.jwtService.verifyToken(accessToken);
      const userPayLoad: CurrentUserDto = {
        id: payload.id,
        role: payload.role,
        accessToken: accessToken,
      };
      request.user = userPayLoad;
      return next.handle();
    } catch (error) {
      this.ThrowError(error);
    }
  }
}
