import { Employee } from "./employee.types";
import { WorkHour } from "./work-types.types";

export enum TimeAdjustmentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export type TimeAdjustmentRequest = {
  id: number;
  employee_id: number;
  employee?: Employee;
  work_hour_id?: number | null;
  work_hour?: WorkHour | null;
  original_clock_in: Date;
  original_clock_out?: Date;
  proposed_clock_in?: Date;
  proposed_clock_out?: Date;
  reason?: string;
  status: TimeAdjustmentStatus;
  admin_comment?: string;
  reviewed_by?: number;
  reviewed_at?: Date;
  created_at: Date;
  updated_at: Date;
};

export type CreateTimeAdjustmentRequest = {
  employee_id: number;
  work_hour_id?: number | null;
  original_clock_in: string;
  original_clock_out?: string;
  proposed_clock_in?: string;
  proposed_clock_out?: string;
  reason?: string;
};

export type ReviewTimeAdjustmentRequest = {
  admin_comment: string;
  reviewed_by: number;
};

export const TimeAdjustmentStatusLabel: Record<TimeAdjustmentStatus, string> = {
  [TimeAdjustmentStatus.PENDING]: "Pendente",
  [TimeAdjustmentStatus.APPROVED]: "Aprovado",
  [TimeAdjustmentStatus.REJECTED]: "Rejeitado"
};
