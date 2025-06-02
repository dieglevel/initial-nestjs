import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DetailInformationService } from "./detail-information.service";
import { CreateDetailInformationDto } from "./dto/create-detail-information.dto";
import { UpdateDetailInformationDto } from "./dto/update-detail-information.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Detail Information")
@Controller("detail-information")
export class DetailInformationController {
  constructor(
    private readonly detailInformationService: DetailInformationService,
  ) {}

  @Post()
  create(@Body() createDetailInformationDto: CreateDetailInformationDto) {
    return this.detailInformationService.create(createDetailInformationDto);
  }

  @Get()
  findAll() {
    return this.detailInformationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.detailInformationService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDetailInformationDto: UpdateDetailInformationDto,
  ) {
    return this.detailInformationService.update(id, updateDetailInformationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.detailInformationService.remove(id);
  }
}
