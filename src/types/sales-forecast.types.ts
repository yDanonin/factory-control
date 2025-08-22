import { Customer } from "./customer.types";
import { Product } from "./product.types";

export enum SalesForecastStatus {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  ORDERED = 4,
}

export const SalesForecastStatusLabel: Record<SalesForecastStatus, string> = {
  [SalesForecastStatus.PENDING]: "Pendente",
  [SalesForecastStatus.ACCEPTED]: "Aceito",
  [SalesForecastStatus.REJECTED]: "Rejeitado",
  [SalesForecastStatus.ORDERED]: "Ordenado",
};

export type SalesForecast = {
  id: number;
  customer: Customer;
  product: Product;
  status: SalesForecastStatus;
  reason?: string;
  next_estimated_date?: Date;
  frequency_days?: number;
  quantity: string;
  created_at: Date;
  created_by?: string;
  updated_at: Date;
  updated_by?: string;
};

export type SalesForecastRegister = Omit<SalesForecast, "id" | "created_at" | "updated_at" | "customer" | "product"> & {
  customer_id: number;
  product_id: number;
};

export type UpdatePartialSalesForecast = Partial<SalesForecast>;

export type SalesForecastRequest = Partial<SalesForecast> & { page?: number; perPage?: number };


