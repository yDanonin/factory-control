export enum Status {
  operacional = 1,
  suspenso = 2
}

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
  cpf?: string;
  cnpj?: string;
};

export type CustomerRequest = {
  page: number;
  perPage: number;
};
