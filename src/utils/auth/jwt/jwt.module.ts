import { Module } from "@nestjs/common";
import { JwtModule as JwtModuleNestJS } from "@nestjs/jwt";
import { JwtService } from "./jwt.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
@Module({
  imports: [
    JwtModuleNestJS.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: "7d",
          algorithm: "HS256",
        },
        verifyOptions: {
          algorithms: ["HS256"],
        },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
