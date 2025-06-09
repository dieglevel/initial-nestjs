import { BaseService } from "@/common/base";
import { RoleEntity } from "@/entities/entity/implement/auth";
import { ROLE_ENUM } from "@/entities/enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

interface Role {
  name: ROLE_ENUM;
  description: string;
}

export class RoleSeeder extends BaseService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {
    super();
  }

  async run() {
    try {
      const roles: Role[] = [
        { name: ROLE_ENUM.CUSTOMER, description: "Customer Role" },
        { name: ROLE_ENUM.ADMIN, description: "Admin Role" },
      ];

      for (const role of roles) {
        const existingRole = await this.roleRepository.findOne({
          where: { name: role.name },
        });

        if (!existingRole) {
          await this.roleRepository.save(role);
        }
      }
    } catch (error) {
      console.error("Error seeding roles:", error);
    }
  }
}
