import { Status } from "./common.types";

export type Product = {
  id: number;
  status: Status;
  volume_sales: number;
  sales: number;
  invoicing: number;
  name: string;
  model: string;
  size: string;
  character: string;
  moldes: number;
  equivalency: number;
  created_at: Date;
  updated_at: Date;
};
