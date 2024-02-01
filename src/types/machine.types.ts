import { Status } from "./common.types";

export type Machine = {
  id: number;
  model: string;
  machine_number: number;
  status: Status;
  location: string;
  location_status: Status;
};
