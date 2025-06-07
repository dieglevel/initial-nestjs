import { SessionEntity } from "@/entities/entity/implement/auth/session.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionService } from "./session.service";

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
