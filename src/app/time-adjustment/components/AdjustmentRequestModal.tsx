"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { WorkHour } from "@/types/work-types.types";

interface AdjustmentRequestModalProps {
  workHour: WorkHour | null;
  employeeId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AdjustmentRequestModal: React.FC<AdjustmentRequestModalProps> = ({
  workHour,
  employeeId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [proposedClockIn, setProposedClockIn] = useState("");
  const [proposedClockOut, setProposedClockOut] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (workHour) {
      setProposedClockIn(moment(workHour.clock_in).format("HH:mm"));
      setProposedClockOut(workHour.clock_out ? moment(workHour.clock_out).format("HH:mm") : "");
      setReason("");
      setError("");
    }
  }, [workHour]);

  const handleSubmit = async () => {
    if (!workHour || !employeeId) return;

    const originalClockIn = moment(workHour.clock_in).format("HH:mm");
    const originalClockOut = workHour.clock_out ? moment(workHour.clock_out).format("HH:mm") : "";

    // Verificar se houve alguma alteracao
    if (proposedClockIn === originalClockIn && proposedClockOut === originalClockOut) {
      setError("Nenhuma alteracao foi feita nos horarios.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Criar datas completas combinando a data original com os novos horarios
    const baseDate = moment(workHour.clock_in).format("YYYY-MM-DD");

    let proposedClockInDate = null;
    if (proposedClockIn && proposedClockIn !== originalClockIn) {
      proposedClockInDate = moment(`${baseDate} ${proposedClockIn}`, "YYYY-MM-DD HH:mm").toISOString();
    }

    let proposedClockOutDate = null;
    if (proposedClockOut && proposedClockOut !== originalClockOut) {
      proposedClockOutDate = moment(`${baseDate} ${proposedClockOut}`, "YYYY-MM-DD HH:mm").toISOString();
    }

    try {
      await axios.post("/api/time-adjustment-requests", {
        employee_id: Number(employeeId),
        work_hour_id: workHour.id,
        original_clock_in: workHour.clock_in,
        original_clock_out: workHour.clock_out || null,
        proposed_clock_in: proposedClockInDate,
        proposed_clock_out: proposedClockOutDate,
        reason: reason || null
      });

      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação de ajuste foi enviada para aprovação."
      });

      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error creating adjustment request:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar solicitação",
        description: error.response?.data?.message || "Tente novamente mais tarde."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!workHour) return null;

  const dateFormatted = moment(workHour.clock_in).format("DD/MM/YYYY");
  const originalClockIn = moment(workHour.clock_in).format("HH:mm");
  const originalClockOut = workHour.clock_out ? moment(workHour.clock_out).format("HH:mm") : "-";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Ajuste de Ponto</DialogTitle>
          <DialogDescription>
            Ajuste os horários de entrada e/ou saída para o dia {dateFormatted}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-md">
            <div>
              <span className="text-sm text-muted-foreground">Entrada atual:</span>
              <p className="font-medium">{originalClockIn}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Saída atual:</span>
              <p className="font-medium">{originalClockOut}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposed_clock_in">Nova Entrada</Label>
              <Input
                id="proposed_clock_in"
                type="time"
                value={proposedClockIn}
                onChange={(e) => setProposedClockIn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposed_clock_out">Nova Saída</Label>
              <Input
                id="proposed_clock_out"
                type="time"
                value={proposedClockOut}
                onChange={(e) => setProposedClockOut(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Justificativa (opcional)</Label>
            <Textarea
              id="reason"
              placeholder="Descreva o motivo do ajuste..."
              className="resize-none"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Solicitação"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustmentRequestModal;
