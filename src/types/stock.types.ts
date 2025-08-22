import { Product } from "./product.types";

export type Stock = {
  id: number;
  amount: number;
  location: string;
  product: Product;
};

export type StockRegister = Omit<Stock, "id" | "product"> & { product_id: number };

export type StockRequest = Partial<Stock> & { page?: number; perPage?: number };

export type UpdatePartialStock = Partial<Stock>;


