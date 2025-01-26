import { OrderItem } from "./order-item.types";

export type Order = {
  id: number;
  final_price: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  items: OrderItem[];
};


