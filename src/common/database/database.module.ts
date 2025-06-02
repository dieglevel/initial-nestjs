import { Module } from "@nestjs/common";
import { PostgresModule } from "./postgres/postgres";

@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
