import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
