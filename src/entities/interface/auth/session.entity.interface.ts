import { IBaseEntity } from "../base.entity.interface";

export interface ISessionEntity extends IBaseEntity {
  accessToken: string;
  refreshToken: string;
  isRefreash: boolean;
}
