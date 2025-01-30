"use client";
import { useState, useEffect } from "react";

import axios from "axios";
import Aside from "@/components/Aside";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import Modal from "@/components/Modal/Modal";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { } from "@/types/order.types";
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
import { Payment } from "@/types/payment.types";

export default function Page() {
  const [data, setData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/payments");
        console.log(resp)
        setData(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();

  const columns = [
    {
      header: "Id",
      accessorKey: "id",
      sortable: true,
    },
    {
      header: "Data",
      accessorKey: "date",
      sortable: true,
    },
    {
      header: "Valor pago",
      accessorKey: "amount_paid",
      sortable: true,
    },
    {
      header: "Restante a ser pago",
      accessorKey: "remaining",
      sortable: true,
    },
    {
      header: "Método de pagamento",
      accessorKey: "payment_method",
      sortable: true,
    },
    {
      header: "Id do pedido",
      accessorKey: "order.id",
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
                onClick={() => router.push(`/receive/payments/${row.original.id}`)}
              >
                Ver detalhes do pagamento
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <Dialog>
                  <Modal typeModal="EDIT" typeRegister="Payment" nameModal="pagamento" rowData={row.original} />
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <Dialog>
                  <Modal typeModal="DELETE" typeRegister="Payment" nameModal="pagamento" idRowData={row.original.id} />
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
          <Header title="Pagamentos" />
          <DynamicTable
            isLoadingSpinner={isLoading}
            columns={columns}
            data={data}
            filterFields={arrayFilterFieldsByAcessorKey}
            typeRegister="Payment"
          />
        </main>
      </div>
    </>
  );
}
