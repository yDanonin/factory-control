"use client";
import React, { useEffect, useState, memo, useCallback } from "react";

import axios from "axios";
import moment from "moment";
import { Edit2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AdjustmentRequestModal } from "@/app/time-adjustment/components/AdjustmentRequestModal";
import { NewClockRequestModal } from "@/app/time-adjustment/components/NewClockRequestModal";
import { WorkHour } from "@/types/work-types.types";

type EmployeeWorkHourByDay = {
  id: number;
  clock_in: Date;
  clock_out: Date | null;
};

function ClocksEmployeeByDay({ dateForApi, idEmployee }: { dateForApi: string; idEmployee: string | undefined }) {
  const [dataWorkedByDay, setDataWorkedByDay] = useState<EmployeeWorkHourByDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkHour, setSelectedWorkHour] = useState<WorkHour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewClockModalOpen, setIsNewClockModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (!dateForApi || !idEmployee) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/employees/work-hours/by-day`, {
        params: {
          day: dateForApi,
          employee_id: idEmployee
        }
      });
      setDataWorkedByDay(response.data);
    } catch (err) {
      console.error("Error fetching work hours:", err);
    } finally {
      setLoading(false);
    }
  }, [dateForApi, idEmployee]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRequestAdjustment = (workHour: EmployeeWorkHourByDay) => {
    setSelectedWorkHour({
      id: workHour.id,
      clock_in: workHour.clock_in,
      clock_out: workHour.clock_out
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedWorkHour(null);
  };

  const handleAdjustmentSuccess = () => {
    fetchData();
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-8">Carregando...</div>
      ) : (
        <div>
          <div className="flex justify-end mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsNewClockModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Solicitar novo ponto
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">Entrada</TableHead>
                  <TableHead className="text-right">Saída</TableHead>
                  <TableHead className="text-center w-[80px]">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataWorkedByDay.length > 0 ? (
                  dataWorkedByDay.map((workHour) => (
                    <TableRow key={workHour.id}>
                      <TableCell className="text-right font-medium">
                        {moment(workHour.clock_in).format("HH:mm:ss")}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {workHour.clock_out
                          ? moment(workHour.clock_out).format("HH:mm:ss")
                          : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRequestAdjustment(workHour)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Solicitar ajuste</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      Sem registros para este dia.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <AdjustmentRequestModal
        workHour={selectedWorkHour}
        employeeId={idEmployee}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleAdjustmentSuccess}
      />

      <NewClockRequestModal
        date={dateForApi}
        employeeId={idEmployee}
        isOpen={isNewClockModalOpen}
        onClose={() => setIsNewClockModalOpen(false)}
        onSuccess={handleAdjustmentSuccess}
      />
    </div>
  );
}

export default memo(ClocksEmployeeByDay);
