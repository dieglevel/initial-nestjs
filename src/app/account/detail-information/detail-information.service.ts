import { Injectable } from "@nestjs/common";
import { CreateDetailInformationDto } from "./dto/create-detail-information.dto";
import { UpdateDetailInformationDto } from "./dto/update-detail-information.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DetailInformationEntity } from "@/entities/entity/implement/auth";
import { BaseService } from "@/common/base";

@Injectable()
export class DetailInformationService extends BaseService {
  constructor(
    @InjectRepository(DetailInformationEntity)
    private readonly detailInformationRespository: Repository<DetailInformationEntity>,
  ) {
    super();
  }

  async create(createDetailInformationDto: CreateDetailInformationDto) {
    try {
      const detailInformation = this.detailInformationRespository.create(
        createDetailInformationDto,
      );
      return await this.detailInformationRespository.save(detailInformation);
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async findAll(): Promise<DetailInformationEntity[]> {
    try {
      return await this.detailInformationRespository.find();
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async findOne(id: string): Promise<DetailInformationEntity | null> {
    try {
      const detailInformation = await this.detailInformationRespository.findOne(
        {
          where: { id },
        },
      );
      if (!detailInformation) {
        this.NotFoundException("Detail information not found");
      }

      return detailInformation;
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async update(
    id: string,
    updateDetailInformationDto: UpdateDetailInformationDto,
  ): Promise<DetailInformationEntity | null> {
    try {
      const detailInformation = await this.detailInformationRespository.preload(
        {
          id,
          ...updateDetailInformationDto,
        },
      );

      if (!detailInformation) {
        throw new Error("Detail information not found");
      }

      return await this.detailInformationRespository.save(detailInformation);
    } catch (error) {
      this.ThrowError(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.detailInformationRespository.delete(id);
    } catch (error) {
      this.ThrowError(error);
    }
  }
}
