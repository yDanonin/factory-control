"use client";
import { useState, useEffect } from "react";

import axios from "axios";
import { TimeConfiguration } from "@/types/time-configuration.types";
import DynamicTable from "@/components/DynamicTable";
import Modal from "@/components/Modal/Modal";
import { DataRow, TableColumn } from "@/models/TableColumn";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { AlertDialog } from "@/components/ui/alert-dialog";

export const TimeConfigTable = () => {
  const [data, setData] = useState<TimeConfiguration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/time-configurations");
        setData(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      header: "Dia da Semana",
      accessorKey: "day_of_week"
    },
    {
      header: "Horário de entrada",
      accessorKey: "work_start"
    },
    {
      header: "Horário de saída",
      accessorKey: "work_end"
    },
    {
      header: "Tempo limite de atraso",
      accessorKey: "late_limit_in_minutes"
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<DataRow> }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <AlertDialog>
                  <Modal
                    typeModal="EDIT"
                    typeRegister="TimeConfiguration"
                    nameModal="Tempo"
                    rowData={row.original}
                    idRowData={row.original.id}
                  />
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ]

  const arrayFilterFieldsByAcessorKey = columns.reduce((acc: TableColumn<DataRow>[], column) => {
    if (column.accessorKey && column.header) {
      acc.push({ header: column.header, accessorKey: column.accessorKey });
    }
    return acc;
  }, []);

  return (
    <main className="main-layout">
      <DynamicTable
            isLoadingSpinner={isLoading}
            columns={columns}
            data={data}
            filterFields={arrayFilterFieldsByAcessorKey}
          />
    </main>
   
  );
}
