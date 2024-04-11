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
import DynamicTable from "@/components/DynamicTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page() {
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
      header: "Entrega/Retirada",
      accessorKey: "deliver"
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
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/customers");
        setData(resp.data.data);
      } catch (err) {
        setError(error);
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
        <DynamicTable columns={columns} data={data} filterField="name" />
      </main>
    </div>
  );
}
