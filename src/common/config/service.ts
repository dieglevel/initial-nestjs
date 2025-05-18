import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
   imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
   })],
   controllers: [],
   providers: [],
})

export class ServiceModule implements OnModuleInit { 
   onModuleInit() {
   }
}