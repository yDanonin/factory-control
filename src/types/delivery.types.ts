import { Order } from "./order.types";
import { Packaging } from "./packaging.types";

export enum DeliveryStatus {
  PLANNING = 1,
  IN_ROUTE = 2,
  DELIVERED = 3
}

export const DeliveryStatusLabel: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PLANNING]: "Em planejamento",
  [DeliveryStatus.IN_ROUTE]: "Em rota",
  [DeliveryStatus.DELIVERED]: "Entregue"
};

export type Delivery = {
  id: number;
  order_id: number;
  status: DeliveryStatus;
  delivery_date: Date;
  created_at: Date;
  updated_at: Date;
  order: Order;
  packagings: DeliveryPackaging[];
};

export type DeliveryResponse = Omit<Delivery, "status"> & {
  status: string;
};

export type DeliveryPackaging = {
  id: number;
  delivery_id: number;
  packaging_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  packaging: Packaging;
};

export type DeliveryRegister = Omit<Delivery, "id" | "created_at" | "updated_at" | "order" | "packagings"> & {
  packagings: {
    packaging_id: number;
    quantity: number;
  }[];
};

export type UpdatePartialDelivery = Partial<DeliveryRegister>; 