import { Order } from "./order.types";

export type LabelPrint = {
  id: number;
  order: Order;
  created_at: Date;
  created_by?: string;
  updated_at: Date;
  updated_by?: string;
};

export type LabelPrintRegister = Omit<LabelPrint, "id" | "created_at" | "updated_at" | "order"> & {
  order_id: number;
};

export type UpdatePartialLabelPrint = Partial<LabelPrintRegister>;

export type LabelPrintRequest = Partial<LabelPrint> & { page?: number; perPage?: number };


