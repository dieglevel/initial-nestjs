import { PartialType } from '@nestjs/swagger';
import { CreateJustLogSomethingDto } from './create-just-log-something.dto';

export class UpdateJustLogSomethingDto extends PartialType(CreateJustLogSomethingDto) {}
