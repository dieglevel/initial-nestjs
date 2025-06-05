import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { IDetailInformationEntity } from "../../../interface/auth/detail-information.entity.interface";
import { AccountEntity } from "./account.entity";
import { BaseEntity } from "../../base.entity";

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

  @Column({ type: "bool", default: true })
  gender: boolean;

  @OneToOne(() => AccountEntity, (account) => account.detailInformation)
  @JoinColumn()
  account: AccountEntity;
}
