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
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  ApiResponseWrapperArray,
  ApiResponseWrapperSingle,
} from "@/common/decorators";
import { DetailInformationResponse } from "./dto/response";
import { BadRequestResponse } from "@/common/base";

@ApiTags("Detail Information")
@Controller("detail-information")
export class DetailInformationController {
  constructor(
    private readonly detailInformationService: DetailInformationService,
  ) {}

  // @Post()
  // @ApiResponseWrapperSingle(DetailInformationResponse)
  // @ApiBadRequestResponse({
  //   description: "Failed to create detail information.",
  //   type: BadRequestResponse,
  // })
  // async create(@Body() createDetailInformationDto: CreateDetailInformationDto) {
  //   return await this.detailInformationService.create(
  //     createDetailInformationDto,
  //   );
  // }

  // @Get()
  // @ApiResponseWrapperArray(DetailInformationResponse)
  // async findAll() {
  //   return await this.detailInformationService.findAll();
  // }

  // @Get(":id")
  // @ApiResponseWrapperSingle(DetailInformationResponse)
  // async findOne(@Param("id") id: string) {
  //   return await this.detailInformationService.findOne(id);
  // }

  // @Patch(":id")
  // @ApiResponseWrapperSingle(DetailInformationResponse)
  // async update(
  //   @Param("id") id: string,
  //   @Body() updateDetailInformationDto: UpdateDetailInformationDto,
  // ) {
  //   return await this.detailInformationService.update(
  //     id,
  //     updateDetailInformationDto,
  //   );
  // }

  // @Delete(":id")
  // @ApiResponse({
  //   status: 200,
  //   description: "Detail information successfully deleted.",
  // })
  // async remove(@Param("id") id: string) {
  //   return await this.detailInformationService.remove(id);
  // }
}
