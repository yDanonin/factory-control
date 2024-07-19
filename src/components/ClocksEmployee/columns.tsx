"use client";

import moment from "moment";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import ClocksEmployeeByDay from "./ClocksEmployeeByDay/ClocksEmployeeByDay";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";

export type EmployeeWorkHour = {
  data: Date;
  primeiroPonto: Date;
  ultimoPonto?: Date;
  totalHoras: Date;
};

export const getColumns = (id: string | undefined): ColumnDef<EmployeeWorkHour>[] => [
  {
    accessorKey: "data",
    header: () => <div className="text-right">Data</div>,
    cell: ({ row }) => {
      const data = moment(row.getValue("primeiroPonto")).format("DD-MM-YYYY");
      return <div className="text-right font-medium">{data}</div>;
    }
  },
  {
    accessorKey: "primeiroPonto",
    header: () => <div className="text-right">Entrada</div>,
    cell: ({ row }) => {
      const clockIn = moment(row.getValue("primeiroPonto")).format("HH:mm:ss");
      return <div className="text-right font-medium">{clockIn}</div>;
    }
  },
  {
    accessorKey: "ultimoPonto",
    header: () => <div className="text-right">Saída</div>,
    cell: ({ row }) => {
      const clockOut = moment(row.getValue("ultimoPonto")).format("HH:mm:ss");
      return <div className="text-right font-medium">{clockOut}</div>;
    }
  },
  {
    accessorKey: "totalHoras",
    header: () => <div className="text-right">Horas trabalhadas no dia</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("totalHoras")}</div>;
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dateFormated = moment(row.getValue("primeiroPonto")).format("DD-MM-YYYY");
      return (
        <div className="text-center">
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <SheetTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                </SheetTrigger>
                <TooltipContent>
                  <p>Ver Histórico de descanso do dia</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <SheetContent className="max-w-[400px] sm:max-w-[540px]">
              <SheetHeader>
                <SheetTitle>Histórico de descanso</SheetTitle>
              </SheetHeader>
              <SheetDescription>{dateFormated}</SheetDescription>
              <div>
                <ClocksEmployeeByDay dateFormated={dateFormated} idEmployee={id} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      );
    }
  }
];
