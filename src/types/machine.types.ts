import { Status } from "./common.types";
import { Location } from "./location.types";

export type Machine = {
  id: number;
  model: string;
  machine_number: number;
  status: Status;
  location_id?: number;
  location?: Location;
  location_status: Status;
  created_at: Date;
  updated_at: Date;
};
