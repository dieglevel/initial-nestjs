import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
import { SessionEntity } from "@/entities/entity/implement/auth/session.entity";

export class CreateSessionDto
  implements
    Pick<
      SessionEntity,
      "accessToken" | "refreshToken" | "account" | "isRefresh"
    >
{
  isRefresh: boolean;
  accessToken: string;
  refreshToken: string;
  account: AccountEntity;
  isRefreash: boolean;
}
