import { Order } from "./order.types";

export type ProductionControl = {
  id: number;
  order: Order;
  status: number;
  material_disponibility: number;
  created_at: Date;
  updated_at: Date;
};

export type ProductionControlRegister = Omit<ProductionControl, "id" | "created_at" | "updated_at" | "order"> & {
  order_id: number;
};

export type ProductionControlRequest = Partial<ProductionControl> & { page?: number; perPage?: number };

export type UpdatePartialProductionControl = Partial<ProductionControl>;
