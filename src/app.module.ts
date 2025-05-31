import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config';
import { JustLogSomethingModule } from './app/just-log-something/just-log-something.module';

@Module({
  imports: [ConfigModule, JustLogSomethingModule, AppModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
