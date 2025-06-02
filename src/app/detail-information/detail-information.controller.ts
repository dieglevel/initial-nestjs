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
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseController } from "@/common/base/base-controller";
import { DetailInformationResponse } from "./dto/response/base.response";

@ApiTags("Detail Information")
@Controller("detail-information")
export class DetailInformationController extends BaseController {
  constructor(
    private readonly detailInformationService: DetailInformationService,
  ) {
    super();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: "Detail information created successfully",
    type: DetailInformationResponse,
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request",
  })
  async create(@Body() createDetailInformationDto: CreateDetailInformationDto) {
    return await this.detailInformationService.create(
      createDetailInformationDto,
    );
  }

  @Get()
  async findAll() {
    return this.okResponse(await this.detailInformationService.findAll());
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.okResponse(await this.detailInformationService.findOne(id));
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDetailInformationDto: UpdateDetailInformationDto,
  ) {
    return this.okResponse(
      await this.detailInformationService.update(
        id,
        updateDetailInformationDto,
      ),
    );
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.okResponse(await this.detailInformationService.remove(id));
  }
}
