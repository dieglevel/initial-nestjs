import { BaseService } from "@/common/base";
import {
  AccountEntity,
  DetailInformationEntity,
  RoleEntity,
} from "@/entities/entity/implement/auth";
import { ROLE_ENUM } from "@/entities/enum";
import { generatePassword } from "@/utils/password/generate-password";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

interface IAccountSeeder {
  email: string;
  username: string;
  password: string;
  role: ROLE_ENUM;
}

export class AccountSeeder extends BaseService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,

    @InjectRepository(DetailInformationEntity)
    private detailInformationRepository: Repository<DetailInformationEntity>,
  ) {
    super();
  }

  async run() {
    try {
      const accounts: IAccountSeeder[] = [
        {
          email: "customer1@gmail.com",
          username: "customer1",
          password: await generatePassword("password1"),
          role: ROLE_ENUM.CUSTOMER,
        },
        {
          email: "customer2@gmail.com",
          username: "customer2",
          password: await generatePassword("password2"),
          role: ROLE_ENUM.CUSTOMER,
        },
        {
          email: "admin@gmail.com",
          username: "admin",
          password: await generatePassword("admin123"),
          role: ROLE_ENUM.ADMIN,
        },
      ];

      for (const account of accounts) {
        if (
          !(await this.accountRepository.findOne({
            where: { email: account.email },
          }))
        ) {
          const role = await this.roleRepository.findOne({
            where: { name: account.role },
          });

          if (!role) {
            throw new Error(`Role ${account.role} not found`);
          }
          const newAccount = this.accountRepository.create({
            email: account.email,
            username: account.username,
            password: account.password,
            role: role,
            isActive: true, // Set to true for seeding
            isVerify: true, // Set to true for seeding
          });
          const savedAccount = await this.accountRepository.save(newAccount);
          const detailInformation = this.detailInformationRepository.create({
            account: savedAccount,
          });
          await this.detailInformationRepository.save(detailInformation);
        }
      }
    } catch (error) {
      this.ThrowError(error);
    }
  }
}
