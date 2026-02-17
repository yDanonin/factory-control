import { Employee } from "@/types/employee.types";

export type WorkHour = {
  id: number;
  employee?: Employee;
  clock_in: Date;
  clock_out?: Date | null;
  created_at?: Date;
  updated_at?: Date;
};