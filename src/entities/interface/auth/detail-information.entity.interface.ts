import { IBaseEntity } from "../base.entity.interface";

export interface IDetailInformationEntity extends IBaseEntity {
  fullName: string;
  dateOfBirth: Date;
  avatarUrl: string;
  thumbnailUrl: string;
  gender: boolean;
}
