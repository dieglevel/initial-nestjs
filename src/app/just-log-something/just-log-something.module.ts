import { Module } from '@nestjs/common';
import { JustLogSomethingService } from './just-log-something.service';
import { JustLogSomethingController } from './just-log-something.controller';

@Module({
  controllers: [JustLogSomethingController],
  providers: [JustLogSomethingService],
})
export class JustLogSomethingModule {}
