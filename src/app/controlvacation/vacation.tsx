"use client";
import { useState, useEffect } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import Modal from "@/components/Modal/Modal";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { Vacation } from "@/types/vacation.types";
import DynamicTable from "@/components/DynamicTable";
import { DataRow, TableColumn } from "@/models/TableColumn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


export const VacationPage = () => {
  const router = useRouter();
  const [data, setData] = useState<Vacation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/employees/vacations");
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
      header: "Id do Funcionário",
      accessorKey: "employee_id"
    },
    {
      header: "Data de inicio",
      accessorKey: "start_date"
    },
    {
      header: "Data final",
      accessorKey: "end_date"
    },
    {
      header: "Total de dias vendidos",
      accessorKey: "sold_days"
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
              <DropdownMenuLabel>Ver mais</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <Dialog>
                  <Modal
                    typeModal="EDIT"
                    typeRegister="Vacation"
                    nameModal="férias"
                    rowData={row.original}
                    idRowData={row.original.id}
                  />
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <Dialog>
                  <Modal
                    typeModal="DELETE"
                    typeRegister="Vacation"
                    nameModal="férias"
                    rowData={row.original}
                    idRowData={row.original.id}
                  />
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const arrayFilterFieldsByAcessorKey = columns.reduce((acc: TableColumn<DataRow>[], column) => {
    if (column.accessorKey && column.header) {
      acc.push({ header: column.header, accessorKey: column.accessorKey });
    }
    return acc;
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fullscreen-spinner">
          <Spinner visible={true} color="default" message="Loading Page..."/>
        </div>
      )}
      <main className="main-layout">
        <DynamicTable
              isLoadingSpinner={isLoading}
              columns={columns}
              data={data}
              filterFields={arrayFilterFieldsByAcessorKey}
              typeRegister="Vacation"
            />
      </main>
    </>
  );
}
