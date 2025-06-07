export type IPayload = {
  id: string;
} & Record<string, any>;

export type IPayloadPayment = {
  orderId: string;
};
