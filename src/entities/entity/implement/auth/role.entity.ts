import { Column, Entity, OneToMany } from "typeorm";
import { AccountEntity } from "./account.entity";
import { BaseEntity } from "../../base.entity";
import { IRoleEntity } from "@/entities/interface/auth/role.entity.interface";
import { ROLE_ENUM } from "@/entities/enum/role.enum";

@Entity("role")
export class RoleEntity extends BaseEntity<RoleEntity> implements IRoleEntity {
  @Column({
    type: "enum",
    nullable: false,
    enum: ROLE_ENUM,
    default: ROLE_ENUM.CUSTOMER,
  })
  name: ROLE_ENUM;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @OneToMany(() => AccountEntity, (account) => account.role)
  accounts: AccountEntity[];
}
