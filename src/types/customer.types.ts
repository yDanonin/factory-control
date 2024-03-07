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
  document: string;
  address: Address;
};

export type CustomerRegister = Omit<Customer, "id">;

export type CustomerRequest = Partial<Omit<Customer, "credit_limit">> & {
  page: number;
  perPage: number;
};

export type CustomerStatusString = Omit<Customer, "status"> & { status: string };
