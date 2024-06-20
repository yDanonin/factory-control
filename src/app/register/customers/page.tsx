"use client";
import { useState, useEffect } from "react";

import "./Customers.css";
import axios from "axios";
import Aside from "@/components/Aside";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer.types";
import { TableColumn } from "@/models/TableColumn";
import DynamicTable from "@/components/DynamicTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header"
import Modal from "@/components/Modal/Modal";
import { AlertDialog } from "@/components/ui/alert-dialog";

export default function Page() {
  const [data, setData] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/customers");
        setData(resp.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // const [error, setError] = useState(null);
  const router = useRouter();

  const columns = [
    {
      header: "Nome",
      accessorKey: "name"
    },
    {
      header: "Status",
      accessorKey: "status"
    },
    {
      header: "Num. telefone",
      accessorKey: "phone"
    },
    {
      header: "Num. celular",
      accessorKey: "cel_number"
    },
    {
      header: "Email",
      accessorKey: "email"
    },
    {
      header: "Loja",
      accessorKey: "store_name"
    },
    {
      header: "Cpf/Cnpj",
      accessorKey: "cpf"
    },
    {
      header: "Limite de crédito",
      accessorKey: "credit_limit"
    },
    {
      header: "Dívidas",
      accessorKey: "debts"
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<Customer> }) => {
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
              >
                Ver detalhes do cliente
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <AlertDialog>
                  <Modal
                    typeModal="EDIT"
                    typeRegister="Customer"
                    nameModal="cliente"
                    rowData={row.original}
                    idRowData={row.original.id}
                  />
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <AlertDialog>
                  <Modal
                    typeModal="DELETE"
                    typeRegister="Customer"
                    nameModal="cliente"
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

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <Header title="Clientes"/>
        <DynamicTable
          columns={columns}
          data={data}
          filterFields={arrayFilterFieldsByAcessorKey}
          typeRegister="Customer"
        />
      </main>
    </div>
  );
}
