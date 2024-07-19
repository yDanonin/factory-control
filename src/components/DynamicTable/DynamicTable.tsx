"use client";

import React, { useState } from "react";

import "./DynamicTable.css";
import { ChevronDown } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import Modal from "@/components/Modal/Modal";
// import { Vendor } from "@/types/vendor.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
// import { Machine } from "@/types/machine.types";
// import { Product } from "@/types/product.types";
// import { Customer } from "@/types/customer.types";
// import { Employee } from "@/types/employee.types";
// import { Procedure } from "@/types/procedure.types";
import { DataRow, TableColumn } from "@/models/TableColumn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

interface TableProps {
  columns: TableColumn<DataRow>[];
  data: unknown;
  // data:
  //   | Partial<Customer>[]
  //   | Partial<Employee>[]
  //   | Partial<Machine>[]
  //   | Partial<Procedure>[]
  //   | Partial<Product>[]
  //   | Partial<Vendor>[];
  filterFields?: TableColumn<DataRow>[];
  typeRegister?: string;
  isLoadingSpinner?: boolean;
}

const DynamicTable: React.FC<TableProps> = ({ columns, data, isLoadingSpinner, filterFields = [], typeRegister }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className={typeRegister ? "w-full p-4" : "w-full"}>
      {typeRegister && (
        <div className="flex items-center py-4 gap-4 flex-wrap">
          {filterFields && (
            <div className="w-full grid grid-cols-4 gap-4">
              {filterFields.map((filterField, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    name={filterField.accessorKey}
                    placeholder={"Filtrar " + filterField.header?.toLocaleLowerCase() + "..."}
                    value={(table.getColumn(filterField.accessorKey || "")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                      table.getColumn(filterField.accessorKey || "")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="w-1/2 flex justify-between">
            <Dialog>
              <Modal typeModal="CREATE" nameModal={typeRegister} typeRegister={typeRegister} />
            </Dialog>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="px-3">
              <Button variant="outline" className="ml-auto">
                Colunas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.columnDef.header}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoadingSpinner ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Spinner color="default" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row?.getValue("status") === "Suspenso" ? "bg-red-100" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
