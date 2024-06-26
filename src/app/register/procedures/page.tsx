"use client";
import { useState, useEffect } from "react";

import "./Procedures.css";
import axios from "axios";
import Aside from "@/components/Aside";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import Modal from "@/components/Modal/Modal";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableColumn } from "@/models/TableColumn";
import { Procedure } from "@/types/procedure.types";
import DynamicTable from "@/components/DynamicTable";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page() {
  const [data, setData] = useState<Procedure[]>([]);
  // const [error, setError] = useState(null);
  const router = useRouter();

  const columns = [
    {
      header: "Nome do processo",
      accessorKey: "process_name"
    },
    {
      header: "Status",
      accessorKey: "status"
    },
    {
      header: "Qtd. Trabalhadores",
      accessorKey: "workers"
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<Procedure> }) => {
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/register/procedures/${row.original.id}`)}
              >
                Ver detalhes do processo
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <AlertDialog>
                  <Modal
                    typeModal="EDIT"
                    typeRegister="Procedure"
                    nameModal="processo"
                    rowData={row.original}
                    idRowData={row.original.id}
                  />
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <AlertDialog>
                  <Modal
                    typeModal="DELETE"
                    typeRegister="Procedure"
                    nameModal="processo"
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
  ];

  const arrayFilterFieldsByAcessorKey = columns.reduce((acc: TableColumn[], column) => {
    if (column.accessorKey && column.header) {
      acc.push({ header: column.header, accessorKey: column.accessorKey });
    }
    return acc;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("api/procedures");
        setData(resp.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <DynamicTable
          columns={columns}
          data={data}
          filterFields={arrayFilterFieldsByAcessorKey}
          typeRegister="Procedure"
        />
      </main>
    </div>
  );
}
