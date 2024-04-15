import { Row } from "@tanstack/react-table";
import { Customer } from "@/types/customer.types";

export interface TableColumn {
  id?: string;
  cell?: ({ row }: { row: Row<Customer> }) => JSX.Element;
  enableHiding?: boolean;
  header?: string;
  accessorKey?: string;
}
