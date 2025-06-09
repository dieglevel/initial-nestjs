import { VerifyOtpCase } from "@/common/base/interfaces";

export type IOtpPayload = {
  accountId: string;
  type: VerifyOtpCase;
};
