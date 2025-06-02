import { Injectable } from "@nestjs/common";
import { CreateDetailInformationDto } from "./dto/create-detail-information.dto";
import { UpdateDetailInformationDto } from "./dto/update-detail-information.dto";
import { DetailInformationEntity } from "@/entities/auth/detail-information.entites";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DetailInformationService {
  constructor(
    @InjectRepository(DetailInformationEntity)
    private readonly detailInformationRespository: Repository<DetailInformationEntity>,
  ) {}

  async create(createDetailInformationDto: CreateDetailInformationDto) {
    const detailInformation = this.detailInformationRespository.create(
      createDetailInformationDto,
    );
    return await this.detailInformationRespository.save(detailInformation);
  }

  async findAll() {
    return await this.detailInformationRespository.find();
  }

  async findOne(id: string) {
    return await this.detailInformationRespository.findOne({
      where: { id: id },
    });
  }

  async update(
    id: string,
    updateDetailInformationDto: UpdateDetailInformationDto,
  ) {
    await this.detailInformationRespository.update(
      id,
      updateDetailInformationDto,
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.detailInformationRespository.delete(id);
  }
}
