import { Injectable } from '@nestjs/common';
import { CreateJustLogSomethingDto } from './dto/create-just-log-something.dto';
import { UpdateJustLogSomethingDto } from './dto/update-just-log-something.dto';

@Injectable()
export class JustLogSomethingService {
  create(createJustLogSomethingDto: CreateJustLogSomethingDto) {
    return 'This action adds a new justLogSomething';
  }

  findAll() {
    return `This action returns all justLogSomething`;
  }

  findOne(id: number) {
    return `This action returns a #${id} justLogSomething`;
  }

  update(id: number, updateJustLogSomethingDto: UpdateJustLogSomethingDto) {
    return `This action updates a #${id} justLogSomething`;
  }

  remove(id: number) {
    return `This action removes a #${id} justLogSomething`;
  }
}
