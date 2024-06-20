import { Row } from "@tanstack/react-table";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";
import { Machine } from "@/types/machine.types";
import { Procedure } from "@/types/procedure.types";
import { Product } from "@/types/product.types";
import { Vendor } from "@/types/vendor.types";

export type DataRow = Customer | Employee | Machine | Procedure | Product | Vendor;

export type TableColumn<DataRow> = {
  id?: string;
  cell?: ({ row }: { row: Row<DataRow> }) => JSX.Element;
  enableHiding?: boolean;
  header?: string;
  accessorKey?: string;
};
