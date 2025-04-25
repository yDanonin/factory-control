import { Product } from "./product.types";
import { Customer } from "./customer.types";

// Tipo para o Customer como retornado pelo Prisma (sem o address)
export type PriceCustomer = Omit<Customer, 'address'>;

// Tipo para o Product como retornado pelo Prisma
export type PriceProduct = Product;

export type Price = {
  id: number;
  product_id: number;
  customer_id?: number;
  production_cost: number;
  operational_margin: number;
  final_price: number;
  second_line_price?: number;
  frozen_until?: Date;
  status: string;
  last_update: Date;
  created_at: Date;
  product: PriceProduct;
  customer?: PriceCustomer;
}

export type CreatePriceData = Omit<Price, 'id' | 'last_update' | 'created_at' | 'product' | 'customer'>;

export type UpdatePriceData = Partial<CreatePriceData>; 