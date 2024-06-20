import { Status } from "./common.types";
import { Address } from "./address.types";

export type Customer = {
  id: number;
  name: string;
  status: Status;
  phone: string;
  cel_number: string;
  email: string;
  store_name: string;
  deliver: boolean;
  pontalti: boolean;
  secondary_line: boolean;
  credit_limit: number;
  debts: number;
  address: Address;
  cpf: string;
  cnpj: string;
  created_at: Date;
  updated_at: Date;
};

export type CustomerRegister = Omit<Customer, "id">;

export type CustomerRequest = Partial<Omit<Customer, "credit_limit">> & {
  page: number;
  perPage: number;
};

export type CustomerStatusString = Omit<Customer, "status"> & { status: string };
