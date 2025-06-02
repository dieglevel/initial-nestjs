import { IBaseEntity } from "../base/base.entities.interface";

export interface IDetailInformationEntity extends IBaseEntity {
  fullName: string;
  dateOfBirth: Date;
  avatarUrl: string;
  thumbnailUrl: string;
  gender: boolean;
}
