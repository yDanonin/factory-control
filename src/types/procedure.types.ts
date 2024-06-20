import { Status } from "./common.types";

export type Procedure = {
  id: number;
  process_name: string;
  status: Status;
  workers: number;
  created_at: Date;
  updated_at: Date;
};
