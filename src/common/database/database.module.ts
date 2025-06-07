import { Module } from "@nestjs/common";
import { PostgresModule } from "./postgres/postgres.module";

@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
