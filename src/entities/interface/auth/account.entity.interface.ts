import { IBaseEntity } from "../base/base.entities.interface";

export class IAccountEntity extends IBaseEntity {
  email: string;
  password: string;
  phone: string;
  isVerify: boolean;
  isActive: boolean;
}
