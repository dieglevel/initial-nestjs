import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JustLogSomethingService } from './just-log-something.service';
import { CreateJustLogSomethingDto } from './dto/create-just-log-something.dto';
import { UpdateJustLogSomethingDto } from './dto/update-just-log-something.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('just-log-something')
@ApiTags("Just Log Something")
export class JustLogSomethingController {
  constructor(private readonly justLogSomethingService: JustLogSomethingService) {}

  @Post()
  create(@Body() createJustLogSomethingDto: CreateJustLogSomethingDto) {
    return this.justLogSomethingService.create(createJustLogSomethingDto);
  }

  @Get()
  findAll() {
    return this.justLogSomethingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.justLogSomethingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJustLogSomethingDto: UpdateJustLogSomethingDto) {
    return this.justLogSomethingService.update(+id, updateJustLogSomethingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.justLogSomethingService.remove(+id);
  }
}
