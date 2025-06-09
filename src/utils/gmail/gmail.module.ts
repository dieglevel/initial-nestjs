import { Module } from "@nestjs/common";
import { GmailService } from "./gmail.service";
import { ConfigModule } from "@/common/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "@/entities/entity/implement/auth";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AccountEntity])],
  providers: [GmailService],
  exports: [GmailService],
})
export class GmailModule {}
