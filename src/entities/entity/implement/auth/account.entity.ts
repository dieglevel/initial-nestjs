import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { IAccountEntity } from "@/entities/interface/auth";
import { BaseEntity } from "../../base.entity";
import { DetailInformationEntity } from "./detail-information.entity";
import { RoleEntity } from "./role.entity";
import { SessionEntity } from "./session.entity";

@Entity({ name: "account" })
export class AccountEntity
  extends BaseEntity<AccountEntity>
  implements IAccountEntity
{
  @Column({ type: "varchar", nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false })
  email: string;

  // @Column({ type: "varchar", nullable: true })
  // phone: string;

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

  @OneToMany(() => SessionEntity, (session) => session.account)
  sessions: SessionEntity[];
}
