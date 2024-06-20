import { Status } from "./common.types";
import { Address } from "./address.types";

export type Vendor = {
  id: number;
  name: string;
  store_name: string;
  cnpj: string;
  status: Status;
  phone: string;
  cel_number: string;
  deliver: boolean;
  volume_purchases: number;
  purchases: number;
  invoicing: number;
  address: Address;
  created_at: Date;
  updated_at: Date;
};
