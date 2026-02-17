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

interface NewClockRequestModalProps {
  date: string; // formato YYYY-MM-DD
  employeeId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const NewClockRequestModal: React.FC<NewClockRequestModalProps> = ({
  date,
  employeeId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setClockIn("");
      setClockOut("");
      setReason("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!employeeId || !date) return;

    if (!clockIn) {
      setError("Informe o horario de entrada.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Criar datas completas
    const clockInDate = moment(`${date} ${clockIn}`, "YYYY-MM-DD HH:mm").toISOString();
    const clockOutDate = clockOut
      ? moment(`${date} ${clockOut}`, "YYYY-MM-DD HH:mm").toISOString()
      : null;

    try {
      await axios.post("/api/time-adjustment-requests", {
        employee_id: Number(employeeId),
        work_hour_id: 0, // Indica que e um novo registro
        original_clock_in: clockInDate,
        original_clock_out: null,
        proposed_clock_in: clockInDate,
        proposed_clock_out: clockOutDate,
        reason: reason || "Solicitacao de novo registro de ponto"
      });

      toast({
        title: "Solicitacao enviada",
        description: "Sua solicitacao de novo ponto foi enviada para aprovacao."
      });

      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error creating new clock request:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar solicitacao",
        description: error.response?.data?.message || "Tente novamente mais tarde."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dateFormatted = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Novo Ponto</DialogTitle>
          <DialogDescription>
            Solicite a criacao de um novo registro de ponto para o dia {dateFormatted}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clock_in">Entrada</Label>
              <Input
                id="clock_in"
                type="time"
                value={clockIn}
                onChange={(e) => setClockIn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clock_out">Saida (opcional)</Label>
              <Input
                id="clock_out"
                type="time"
                value={clockOut}
                onChange={(e) => setClockOut(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Justificativa (opcional)</Label>
            <Textarea
              id="reason"
              placeholder="Descreva o motivo da solicitacao..."
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
              "Enviar Solicitacao"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewClockRequestModal;
