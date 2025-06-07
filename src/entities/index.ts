import { AccountEntity } from "./entity/implement/auth/account.entity";
import { DetailInformationEntity } from "./entity/implement/auth/detail-information.entity";
import { RoleEntity } from "./entity/implement/auth/role.entity";
import { SessionEntity } from "./entity/implement/auth/session.entity";

export const entities = [
  AccountEntity,
  DetailInformationEntity,
  RoleEntity,
  SessionEntity,
];
