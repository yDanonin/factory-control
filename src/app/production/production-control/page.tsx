"use client";

import { useState, useEffect } from "react";

import "./ProductionControl.css";
import axios from "axios";
import Aside from "@/components/Aside";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import Modal from "@/components/Modal/Modal";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductionControl } from "@/types/production-control.types";
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
  const [data, setData] = useState<ProductionControl[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/production-control");
        setData((resp.data?.data ?? resp.data) || []);
      } catch (err) {
        console.error("Erro ao buscar dados de controle de produção:", err);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();

  const columns = [
    { header: "ID", accessorKey: "id", sortable: true },
    {
      header: "Pedido",
      accessorKey: "order.id",
      sortable: true,
      cell: ({ row }: { row: Row<DataRow> }) => {
        const pc = row.original as ProductionControl;
        return pc.order?.id ?? "-";
      }
    },
    { header: "Status", accessorKey: "status", sortable: true },
    { header: "Disp. Material", accessorKey: "material_disponibility", sortable: true },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<DataRow> }) => {
        const pc = row.original as ProductionControl;
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
                onClick={() => router.push(`/production/production-control/${pc.id}`)}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                <Dialog>
                  <Modal typeModal="EDIT" typeRegister="ProductionControl" nameModal="controle de produção" rowData={pc} idRowData={pc.id} />
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
              >
                <Dialog>
                  <Modal typeModal="DELETE" typeRegister="ProductionControl" nameModal="controle de produção" idRowData={pc.id} />
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const arrayFilterFieldsByAcessorKey = columns.reduce((acc: TableColumn<DataRow>[], column) => {
    if ((column as any).accessorKey && (column as any).header) {
      acc.push({ header: (column as any).header, accessorKey: (column as any).accessorKey });
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
          <Header title="Lista a produzir" />
          <DynamicTable
            isLoadingSpinner={isLoading}
            columns={columns as any}
            data={data as any}
            filterFields={arrayFilterFieldsByAcessorKey}
            typeRegister="ProductionControl"
          />
        </main>
      </div>
    </>
  );
}


