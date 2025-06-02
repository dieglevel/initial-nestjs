import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../base";
import { IAccountEntity } from "../interface/auth/account.entity.interface";
import { DetailInformationEntity } from "./detail-information.entites";

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
}
