"use client";

import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { Trash2, Loader2 } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { TimeAdjustmentRequest, TimeAdjustmentStatus } from "@/types/time-adjustment-request.types";

interface MyAdjustmentRequestsProps {
  data: TimeAdjustmentRequest[];
  onRefresh?: () => void;
}

export const MyAdjustmentRequests: React.FC<MyAdjustmentRequestsProps> = ({ data, onRefresh }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TimeAdjustmentRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteClick = (request: TimeAdjustmentRequest) => {
    setSelectedRequest(request);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRequest) return;

    setIsDeleting(true);
    try {
      await axios.delete(`/api/time-adjustment-requests/${selectedRequest.id}`);
      toast({
        title: "Solicitacao excluida",
        description: "A solicitacao foi excluida com sucesso."
      });
      if (onRefresh) {
        onRefresh();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: error.response?.data?.message || "Nao foi possivel excluir a solicitacao."
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedRequest(null);
    }
  };

  const columns: ColumnDef<TimeAdjustmentRequest>[] = [
    {
      accessorKey: "original_clock_in",
      header: () => <span className="whitespace-nowrap">Data</span>,
      cell: ({ row }) => {
        const date = row.getValue("original_clock_in") as Date;
        return <div className="font-medium whitespace-nowrap">{moment(date).format("DD/MM/YYYY")}</div>;
      }
    },
    {
      id: "type",
      header: () => <span className="whitespace-nowrap">Tipo</span>,
      cell: ({ row }) => {
        const isNewClock = !row.original.work_hour_id;
        return isNewClock
          ? <span className="text-green-600 whitespace-nowrap">Novo ponto</span>
          : <span className="text-orange-600 whitespace-nowrap">Ajuste</span>;
      }
    },
    {
      id: "proposed_times",
      header: () => <span className="whitespace-nowrap">Horario Solicitado</span>,
      cell: ({ row }) => {
        const proposedIn = row.original.proposed_clock_in
          ? moment(row.original.proposed_clock_in).format("HH:mm")
          : null;
        const proposedOut = row.original.proposed_clock_out
          ? moment(row.original.proposed_clock_out).format("HH:mm")
          : null;

        if (!proposedIn && !proposedOut) return <span className="text-muted-foreground">-</span>;

        return (
          <div className="whitespace-nowrap">
            {proposedIn || "-"} - {proposedOut || "-"}
          </div>
        );
      }
    },
    {
      accessorKey: "reason",
      header: () => <span className="whitespace-nowrap">Justificativa</span>,
      cell: ({ row }) => {
        const reason = row.getValue("reason") as string | null;
        if (!reason) return <span className="text-muted-foreground">-</span>;

        const truncated = reason.length > 25 ? reason.slice(0, 25) + "..." : reason;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">{truncated}</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{reason}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
    {
      accessorKey: "status",
      header: () => <span className="whitespace-nowrap">Status</span>,
      cell: ({ row }) => {
        const status = row.getValue("status") as TimeAdjustmentStatus;
        return <StatusBadge status={status} />;
      }
    },
    {
      accessorKey: "admin_comment",
      header: () => <span className="whitespace-nowrap">Resposta</span>,
      cell: ({ row }) => {
        const comment = row.getValue("admin_comment") as string | null;
        if (!comment) return <span className="text-muted-foreground">-</span>;

        const truncated = comment.length > 15 ? comment.slice(0, 15) + "..." : comment;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">{truncated}</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{comment}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
    {
      accessorKey: "created_at",
      header: () => <span className="whitespace-nowrap">Solicitado em</span>,
      cell: ({ row }) => {
        const date = row.getValue("created_at") as Date;
        return <div className="text-muted-foreground text-sm whitespace-nowrap">{moment(date).format("DD/MM/YY HH:mm")}</div>;
      }
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const request = row.original;
        const isPending = request.status === TimeAdjustmentStatus.PENDING;

        if (!isPending) return null;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteClick(request)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Excluir solicitacao</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhuma solicitacao encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Proximo
        </Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir solicitacao</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta solicitacao de ajuste?
              Esta acao nao pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyAdjustmentRequests;
