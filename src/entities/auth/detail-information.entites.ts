import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../base";
import { IDetailInformationEntity } from "../interface/auth/detail-information.entites.interface";
import { AccountEntity } from "./account.entites";

@Entity({ name: "detailInformation" })
export class DetailInformationEntity
  extends BaseEntity<DetailInformationEntity>
  implements IDetailInformationEntity
{
  @Column({ type: "varchar", nullable: true })
  fullName: string;

  @Column({ type: "varchar", nullable: true })
  dateOfBirth: Date;

  @Column({ type: "varchar", nullable: true })
  avatarUrl: string;

  @Column({ type: "varchar", nullable: true })
  thumbnailUrl: string;

  @Column({ type: "bool", nullable: true })
  gender: boolean;

  @OneToOne(() => AccountEntity, (account) => account.detailInformation)
  @JoinColumn()
  account: AccountEntity;
}
