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
  cpf?: string;
  cnpj?: string;
}

