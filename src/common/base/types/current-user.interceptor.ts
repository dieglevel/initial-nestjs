import { ROLE_ENUM } from "@/entities/enum";

export type CurrentUserDto = {
  id: string;
  role: ROLE_ENUM;
  accessToken?: string;
};
