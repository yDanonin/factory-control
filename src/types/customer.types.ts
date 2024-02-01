import { Status } from "./common.types";

export type Customer = {
  id: number;
  name: string;
  status: Status;
  phone: string;
  cel_number: string;
  addressId: number;
  email: string;
  store_name: string;
  deliver: boolean;
  pontalti: boolean;
  secondary_line: boolean;
  credit_limit: number;
  cpf?: string;
  cnpj?: string;
};
