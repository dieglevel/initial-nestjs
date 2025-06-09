import { ROLE_ENUM } from "@/entities/enum";

export type IPayload = {
  id: string;
  role: ROLE_ENUM;
  accessToken?: string;
} & Record<string, any>;
