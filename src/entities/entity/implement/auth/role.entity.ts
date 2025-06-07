import { Column, Entity, OneToMany } from "typeorm";
import { AccountEntity } from "./account.entity";
import { BaseEntity } from "../../base.entity";
import { ROLE_ENUM } from "@/entities/enum";
import { IRoleEntity } from "@/entities/interface/auth";

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
