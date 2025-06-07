import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { ISessionEntity } from "@/entities/interface/auth/session.entity.interface";
import { AccountEntity } from "./account.entity";

@Entity({ name: "session" })
export class SessionEntity
  extends BaseEntity<SessionEntity>
  implements ISessionEntity
{
  @Column({ type: "varchar", nullable: false })
  accessToken: string;

  @Column({ type: "varchar", nullable: false })
  refreshToken: string;

  @Column({ type: "boolean", default: false })
  isRefreash: boolean;

  @ManyToOne(() => AccountEntity, (account) => account.sessions)
  account: AccountEntity;
}
