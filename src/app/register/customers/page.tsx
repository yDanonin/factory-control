"use client";
import { useState, useEffect } from "react";

import "./Customers.css";
import axios from "axios";
import Aside from "@/components/Aside";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import Modal from "@/components/Modal/Modal";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer.types";
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

import Header from "@/components/Header";

export default function Page() {
  const [data, setData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/customers");
        setData(resp.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // const [error, setError] = useState(null);
  const router = useRouter();

  const columns = [
    {
      header: "Nome",
      accessorKey: "name",
      sortable: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
    },
    {
      header: "Num. telefone",
      accessorKey: "phone",
      sortable: true,
    },
    {
      header: "Num. celular",
      accessorKey: "cel_number",
      sortable: true,
    },
    {
      header: "Email",
      accessorKey: "email",
      sortable: true,
    },
    {
      header: "Loja",
      accessorKey: "store_name",
      sortable: true,
    },
    {
      header: "Cpf/Cnpj",
      accessorKey: "cpf",
      sortable: true,
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/register/customers/${row.original.id}`)}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                Ver detalhes do cliente
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                <Dialog>
                  <Modal typeModal="EDIT" typeRegister="Customer" nameModal="cliente" rowData={row.original} />
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                <Dialog>
                  <Modal typeModal="DELETE" typeRegister="Customer" nameModal="cliente" idRowData={row.original.id} />
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
      <div className="page-layout">
        <nav className="aside-layout">
          <Aside />
        </nav>
        <main className="main-layout">
          <Header title="Clientes" />
          <DynamicTable
            isLoadingSpinner={isLoading}
            columns={columns}
            data={data}
            filterFields={arrayFilterFieldsByAcessorKey}
            typeRegister="Customer"
          />
        </main>
      </div>
    </>
  );
}
