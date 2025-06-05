import { IBaseEntity } from "../base.entity.interface";

export class IAccountEntity extends IBaseEntity {
  email: string;
  password: string;
  phone: string;
  isVerify: boolean;
  isActive: boolean;
}
