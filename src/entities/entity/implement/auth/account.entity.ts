import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { IAccountEntity } from "../../../interface/auth/account.entity.interface";
import { DetailInformationEntity } from "./detail-information.entity";
import { BaseEntity } from "../../base.entity";
import { RoleEntity } from "./role.entity";

@Entity({ name: "account" })
export class AccountEntity
  extends BaseEntity<AccountEntity>
  implements IAccountEntity
{
  @Column({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "boolean", default: false })
  isVerify: boolean;
  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => DetailInformationEntity)
  detailInformation: DetailInformationEntity;

  @ManyToOne(() => RoleEntity, (role) => role.accounts)
  @JoinColumn()
  role: RoleEntity;
}
