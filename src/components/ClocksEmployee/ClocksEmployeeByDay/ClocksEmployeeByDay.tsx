"use client";
import React, { useEffect, useState, memo } from "react";

import axios from "axios";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

type EmployeeWorkHourByDay = {
  clockIn: Date;
  clockOut: Date;
};

const columns: ColumnDef<EmployeeWorkHourByDay>[] = [
  {
    accessorKey: "clockIn",
    header: () => <div className="text-right">Entrada</div>,
    cell: ({ row }) => {
      const clockIn = moment(row.getValue("clockIn")).format("HH:mm:ss");
      return <div className="text-right font-medium">{clockIn}</div>;
    }
  },
  {
    accessorKey: "ClockOut",
    header: () => <div className="text-right">Saída</div>,
    cell: ({ row }) => {
      const clockOut = moment(row.getValue("ClockOut")).format("HH:mm:ss");
      return <div className="text-right font-medium">{clockOut}</div>;
    }
  }
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return <div className="text-center"></div>;
  //   }
  // }
];

function ClocksEmployeeByDay({ dateFormated, idEmployee }: { dateFormated: string; idEmployee: string | undefined }) {
  console.log("entrou aq x vezes");
  const [dataWorkedByDay, setDataWorkedByDay] = useState<EmployeeWorkHourByDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dateFormated || !idEmployee) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data: EmployeeWorkHourByDay[] = await axios.get(`/api/employees/work-hours/by-day`, {
          params: {
            day: dateFormated,
            employee_id: idEmployee
          }
        });
        setDataWorkedByDay(data);
        setLoading(false);
        console.log(dataWorkedByDay);
      } catch (err) {
        console.error("Error fetching work hours:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data: dataWorkedByDay,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
      )}
    </div>
  );
}

export default memo(ClocksEmployeeByDay);
