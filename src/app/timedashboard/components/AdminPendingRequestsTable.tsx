"use client";

import React, { useState } from "react";
import moment from "moment";
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
import { TimeAdjustmentRequest, TimeAdjustmentStatus } from "@/types/time-adjustment-request.types";
import { AdminReviewModal } from "./AdminReviewModal";

interface AdminPendingRequestsTableProps {
  data: TimeAdjustmentRequest[];
  onRefresh?: () => void;
}

export const AdminPendingRequestsTable: React.FC<AdminPendingRequestsTableProps> = ({
  data,
  onRefresh
}) => {
  const [selectedRequest, setSelectedRequest] = useState<TimeAdjustmentRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReview = (request: TimeAdjustmentRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleSuccess = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const columns: ColumnDef<TimeAdjustmentRequest>[] = [
    {
      accessorKey: "employee",
      header: () => <span className="whitespace-nowrap">Funcionario</span>,
      cell: ({ row }) => {
        const employee = row.original.employee;
        return <div className="font-medium whitespace-nowrap">{employee?.name || `ID: ${row.original.employee_id}`}</div>;
      }
    },
    {
      accessorKey: "original_clock_in",
      header: () => <span className="whitespace-nowrap">Data</span>,
      cell: ({ row }) => {
        const date = row.getValue("original_clock_in") as Date;
        return <div className="whitespace-nowrap">{moment(date).format("DD/MM/YYYY")}</div>;
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

        const truncated = reason.length > 20 ? reason.slice(0, 20) + "..." : reason;
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
      accessorKey: "created_at",
      header: () => <span className="whitespace-nowrap">Solicitado em</span>,
      cell: ({ row }) => {
        const date = row.getValue("created_at") as Date;
        return <div className="text-muted-foreground text-sm whitespace-nowrap">{moment(date).format("DD/MM/YY HH:mm")}</div>;
      }
    },
    {
      id: "actions",
      header: () => <span className="whitespace-nowrap">Acoes</span>,
      cell: ({ row }) => {
        const request = row.original;
        if (request.status !== TimeAdjustmentStatus.PENDING) {
          return <span className="text-muted-foreground text-sm whitespace-nowrap">Revisado</span>;
        }
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleReview(request)}
          >
            Revisar
          </Button>
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
        pageSize: 10
      }
    }
  });

  return (
    <>
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
                    Nenhuma solicitação pendente.
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
            Próximo
          </Button>
        </div>
      </div>

      <AdminReviewModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default AdminPendingRequestsTable;
