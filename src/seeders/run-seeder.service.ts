import { RoleSeeder } from "./implement/role.seeder";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { BaseService } from "@/common/base";
import { logSeeder } from "./log";
import { ConfigService } from "@nestjs/config";
import { AccountSeeder } from "./implement";

@Injectable()
export class RunSeederService extends BaseService implements OnModuleInit {
  constructor(
    @Inject() private readonly RoleSeeder: RoleSeeder,
    @Inject() private readonly AccountSeeder: AccountSeeder,
    private configService: ConfigService,
  ) {
    super();
  }

  async onModuleInit() {
    const DROP_SCHEMA = this.configService.get<boolean>("DATABASE_DROP_SCHEMA");
    if (DROP_SCHEMA) {
      logSeeder("Role - Seeder", await this.RoleSeeder.run());
      logSeeder("Account - Seeder", await this.AccountSeeder.run());
    }
  }
}
