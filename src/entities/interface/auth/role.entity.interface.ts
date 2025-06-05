import { ROLE_ENUM } from "@/entities/enum/role.enum";
import { IBaseEntity } from "../base.entity.interface";

export interface IRoleEntity extends IBaseEntity {
  name: ROLE_ENUM;
  description: string;
}
