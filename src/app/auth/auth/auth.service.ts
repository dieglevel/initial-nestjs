import { BaseService } from "@/common/base/base-service.base";
import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountDto } from "./dto/create-account";

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super();
  }

  async register(createAccount: CreateAccountDto) {
    try {
      const account = this.accountRepository.create(createAccount);
      return await this.accountRepository.save(account);
    } catch (error) {
      this.ThrowError(error);
    }
  }
}
