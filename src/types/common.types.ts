export type CommonRequest = {
  page: number;
  perPage: number;
};

export enum Status {
  suspenso,
  operacional
}

export type PaginationResponse<T = any> = {
  data: T[];
  page: number;
  perPage: number;
  totalRecord: number;
  nextPage: string;
}


export type DefaultResponse<T = object> = {
  data: T | T[];
}
