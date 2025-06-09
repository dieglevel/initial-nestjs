import { RoleSeeder } from "./implement/role.seeder";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { BaseService } from "@/common/base";
import { logSeeder } from "./log";

@Injectable()
export class RunSeederService extends BaseService implements OnModuleInit {
  constructor(@Inject() private readonly RoleSeeder: RoleSeeder) {
    super();
  }

  async onModuleInit() {
    logSeeder("RoleSeeder", await this.RoleSeeder.run());
  }
}
