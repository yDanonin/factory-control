"use client";
import { useState, useEffect } from "react";

import "./Expense.css";
import axios from "axios";
import Aside from "@/components/Aside";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { Row, ColumnDef } from "@tanstack/react-table";
import Modal from "@/components/Modal/Modal";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicTable from "@/components/DynamicTable";
import { TableColumn } from "@/models/TableColumn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import Header from "@/components/Header";
import type { Expense } from "@/types/expense.types";

export default function Page() {
  const [data, setData] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/expenses");
        console.log(resp);
        setData(resp.data.data || resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();

  const columns: ColumnDef<Expense>[] = [
    {
      header: "ID",
      accessorKey: "id"
    },
    {
      header: "Valor",
      accessorKey: "amount",
      cell: ({ row }: { row: Row<Expense> }) => (
        <span>R$ {parseFloat(row.original.amount).toFixed(2)}</span>
      )
    },
    {
      header: "Classificação",
      accessorKey: "classification",
      cell: ({ row }: { row: Row<Expense> }) => (
        <span>{row.original.classification || '-'}</span>
      )
    },
    {
      header: "Descrição",
      accessorKey: "description",
      cell: ({ row }: { row: Row<Expense> }) => (
        <span>{row.original.description || '-'}</span>
      )
    },
    {
      header: "Justificativa",
      accessorKey: "justification"
    },
    {
      header: "Requer Reembolso",
      accessorKey: "requires_reimbursement",
      cell: ({ row }: { row: Row<Expense> }) => (
        <span>{row.original.requires_reimbursement ? "Sim" : "Não"}</span>
      )
    },
    {
      header: "Data da Despesa",
      accessorKey: "expense_date",
      cell: ({ row }: { row: Row<Expense> }) => (
        <span>{new Date(row.original.expense_date).toLocaleDateString()}</span>
      )
    },
    {
      header: "Responsável",
      accessorKey: "actor.first_name",
      cell: ({ row }: { row: Row<Expense> }) => {
        const actor = row.original.actor;
        if (!actor) return <span>-</span>;
        
        const name = actor.first_name && actor.last_name 
          ? `${actor.first_name} ${actor.last_name}`
          : actor.store_name || '-';
        
        return <span>{name}</span>;
      }
    },
    {
      header: "Data de Criação",
      accessorKey: "created_at",
      cell: ({ row }: { row: Row<Expense> }) => (
        <span>{new Date(row.original.created_at).toLocaleDateString()}</span>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<Expense> }) => {
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
                onClick={() => router.push(`/control/expense/${row.original.id}`)}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                Ver detalhes da despesa
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                <Dialog>
                  <Modal typeModal="EDIT" typeRegister="Expense" nameModal="despesa" rowData={row.original} />
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                <Dialog>
                  <Modal typeModal="DELETE" typeRegister="Expense" nameModal="despesa" idRowData={row.original.id} />
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const arrayFilterFieldsByAcessorKey = columns.reduce((acc: TableColumn<Expense>[], column) => {
    if ('accessorKey' in column && column.accessorKey && 'header' in column && column.header) {
      acc.push({ header: String(column.header), accessorKey: String(column.accessorKey) });
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
          <Header title="Controle de Despesas" />
          <DynamicTable<Expense>
            isLoadingSpinner={isLoading}
            columns={columns}
            data={data}
            filterFields={arrayFilterFieldsByAcessorKey}
            typeRegister="Expense"
          />
        </main>
      </div>
    </>
  );
}
