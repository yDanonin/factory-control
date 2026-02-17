"use client";

import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { formTimeAdjustmentReviewSchema } from "@/schemas/FormSchemas";
import { timeAdjustmentReviewDefaultValues } from "@/schemas/DefaultValuesForm";
import { TimeAdjustmentRequest, TimeAdjustmentStatus } from "@/types/time-adjustment-request.types";

type FormData = z.infer<typeof formTimeAdjustmentReviewSchema>;

interface AdminReviewModalProps {
  request: TimeAdjustmentRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AdminReviewModal: React.FC<AdminReviewModalProps> = ({
  request,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formTimeAdjustmentReviewSchema),
    defaultValues: timeAdjustmentReviewDefaultValues
  });

  async function handleAction(action: "approve" | "reject") {
    const isValid = await form.trigger();
    if (!isValid) return;

    if (!request) return;

    setActionType(action);
    setIsLoading(true);

    const newStatus = action === "approve"
      ? TimeAdjustmentStatus.APPROVED
      : TimeAdjustmentStatus.REJECTED;

    try {
      await axios.put(`/api/time-adjustment-requests/${request.id}/review`, {
        status: newStatus,
        admin_comment: form.getValues("admin_comment")
      });

      toast({
        title: action === "approve" ? "Solicitação aprovada" : "Solicitação rejeitada",
        description: action === "approve"
          ? "O ajuste de ponto foi aprovado com sucesso."
          : "A solicitação foi rejeitada."
      });

      form.reset();
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error reviewing request:", error);
      toast({
        variant: "destructive",
        title: "Erro ao processar solicitação",
        description: error.response?.data?.message || "Tente novamente mais tarde."
      });
    } finally {
      setIsLoading(false);
      setActionType(null);
    }
  }

  if (!request) return null;

  const dateFormatted = moment(request.original_clock_in).format("DD/MM/YYYY");
  const originalClockIn = moment(request.original_clock_in).format("HH:mm");
  const originalClockOut = request.original_clock_out
    ? moment(request.original_clock_out).format("HH:mm")
    : "-";
  const proposedClockIn = request.proposed_clock_in
    ? moment(request.proposed_clock_in).format("HH:mm")
    : null;
  const proposedClockOut = request.proposed_clock_out
    ? moment(request.proposed_clock_out).format("HH:mm")
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Revisar Solicitação de Ajuste</DialogTitle>
          <DialogDescription>
            Revise as alterações solicitadas para o dia {dateFormatted}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Funcionário:</span>
            <p className="font-medium">{request.employee?.name || `ID: ${request.employee_id}`}</p>
          </div>

          <div className="p-3 bg-muted rounded-md space-y-3">
            <div className="text-sm font-medium">Alterações Solicitadas:</div>

            {proposedClockIn && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Entrada:</span>
                <span>{originalClockIn}</span>
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <span className="text-blue-600 font-medium">{proposedClockIn}</span>
              </div>
            )}

            {proposedClockOut && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Saída:</span>
                <span>{originalClockOut}</span>
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <span className="text-blue-600 font-medium">{proposedClockOut}</span>
              </div>
            )}
          </div>

          {request.reason && (
            <div className="text-sm">
              <span className="text-muted-foreground">Justificativa do funcionário:</span>
              <p className="mt-1 p-2 bg-muted rounded-md">{request.reason}</p>
            </div>
          )}

          <Form {...form}>
            <FormField
              control={form.control}
              name="admin_comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentario (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione um comentario sobre sua decisao..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleAction("reject")}
            disabled={isLoading}
          >
            {isLoading && actionType === "reject" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="mr-2 h-4 w-4" />
            )}
            Rejeitar
          </Button>
          <Button
            onClick={() => handleAction("approve")}
            disabled={isLoading}
          >
            {isLoading && actionType === "approve" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminReviewModal;
