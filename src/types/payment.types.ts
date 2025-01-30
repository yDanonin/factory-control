import { Order } from "./order.types";

export type Payment = {
  id: number;
  amount_paid: number;
  remaining: number;
  payment_method: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  order: Order;
};


export type PaymentRegister = Omit<Payment, "id" | "created_at" | "updated_at" | "order" > & {
  order_id: number;
};

export type PaymentRequest = Omit<Payment, "id" | "created_at" | "updated_at" | "order" | "remaining"> & {
  order_id: number;
};