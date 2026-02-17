import { Product } from "./product.types";
import { Location } from "./location.types";

export type Stock = {
  id: number;
  amount: number;
  location_id?: number;
  location?: Location;
  product_id: number;
  product?: Product;
};

export type StockRegister = Omit<Stock, "id" | "product" | "location"> & { product_id: number; location_id?: number };

export type StockRequest = Partial<Stock> & { page?: number; perPage?: number };

export type UpdatePartialStock = Partial<Stock>;


