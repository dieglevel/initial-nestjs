import { BaseService } from "@/common/base";
import { SessionEntity } from "@/entities/entity/implement/auth";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSessionDto } from "./dto";

@Injectable()
export class SessionService extends BaseService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {
    super();
  }
  async create(createSessionDto: CreateSessionDto) {
    try {
      const session = this.sessionRepository.create(createSessionDto);
      return await this.sessionRepository.save(session);
    } catch (error) {
      this.ThrowError(error);
    }
  }

  // async findOne(id: string) {
  //   try {
  //     const session = await FindOneEntity<SessionEntity>(
  //       this.sessionRepository,
  //       {
  //         where: {},
  //       },
  //     );
  //     if (!session) {
  //       this.NotFoundException("Session not found");
  //     }
  //     return session;
  //   } catch (error) {
  //     this.ThrowError(error);
  //   }
  // }

  // async remove(key: keyof SessionEntity, value: any) {
  //   try {
  //     const updateResult = await executeSoftDelete<SessionEntity>(
  //       this.sessionRepository,
  //       {
  //         keyAndValue: { key: key, value: value },
  //       },
  //     );
  //     if (updateResult.affected === 0) {
  //       this.NotFoundException("Session not found");
  //     }
  //     return updateResult;
  //   } catch (error) {
  //     this.ThrowError(error);
  //   }
  // }
}
