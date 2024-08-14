import { Employee } from "@/types/employee.types"

export type Vacation = {
  id: number,
  employee: Employee,
  start_date: Date,
  end_date: Date,
  sold_days: number,
  created_at: Date,
  updated_at: Date
}
