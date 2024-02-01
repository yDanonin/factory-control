import { Status } from "./common.types";

export type Procedure = {
  id: number;
  process_name: string;
  status: Status;
  workers: number;
};
