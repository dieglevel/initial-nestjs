import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
import { RoleEntity } from "@/entities/entity/implement/auth/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, RoleEntity])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
