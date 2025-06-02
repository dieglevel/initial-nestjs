import { Module } from "@nestjs/common";
import { ServiceModule } from "./service";

@Module({
  imports: [ServiceModule],
  providers: [],
})
export class ConfigModule {}
