import { Module } from "@nestjs/common";
import { JwtModule as JwtModuleNestJS } from "@nestjs/jwt";
import { JwtService } from "./jwt.service";
@Module({
  imports: [
    JwtModuleNestJS.registerAsync({
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
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
