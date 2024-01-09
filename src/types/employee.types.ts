export enum Classification {
  funcionario,
  em_teste,
  externo
}

export type Employee = {
  id: number;
  name: string;
  phone: string;
  cel_number: string;
  cpf: string;
  classification: Classification;
  admission: Date;
  salary?: number;
  dismissal_date?: Date;
};
