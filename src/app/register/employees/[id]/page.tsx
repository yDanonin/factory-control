"use client";

import React, { useEffect, useState } from "react";

import VMasker from "vanilla-masker";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import DataList from "@/components/DataList";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee.types";
import DynamicTable from "@/components/DynamicTable";
import { Separator } from "@/components/ui/separator";
import { FileText, MoreVertical } from "lucide-react";
import { calculateHoursWorked, formatDate, formatTime } from "@/services/formatDate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<Employee>();

  const router = useRouter();
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`/api/employees/${params.id}`);
      const data = await response.json();
      console.log("AQUI:", data);
      setEmployee(data);
    };

    fetchEmployees();
  }, [params.id]);

  const today = new Date();
  const entryTime = new Date();
  entryTime.setHours(9, 0, 0); // 09:00:00
  const exitTime = new Date();
  exitTime.setHours(17, 0, 0); // 17:00:00

  const data = [
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(new Date(today.setDate(today.getDate() - 1))),
      entry: formatTime(new Date(entryTime.setDate(entryTime.getDate() - 1))),
      exit: formatTime(new Date(exitTime.setDate(exitTime.getDate() - 1))),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(new Date(today.setDate(today.getDate() - 2))),
      entry: formatTime(new Date(entryTime.setDate(entryTime.getDate() - 2))),
      exit: formatTime(new Date(exitTime.setDate(exitTime.getDate() - 2))),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(new Date(today.setDate(today.getDate() - 3))),
      entry: formatTime(new Date(entryTime.setDate(entryTime.getDate() - 3))),
      exit: formatTime(new Date(exitTime.setDate(exitTime.getDate() - 3))),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(new Date(today.setDate(today.getDate() - 4))),
      entry: formatTime(new Date(entryTime.setDate(entryTime.getDate() - 4))),
      exit: formatTime(new Date(exitTime.setDate(exitTime.getDate() - 4))),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    },
    {
      date_worked: formatDate(today),
      entry: formatTime(entryTime),
      exit: formatTime(exitTime),
      hours_worked: calculateHoursWorked(entryTime, exitTime)
    }
  ];

  const columns = [
    {
      header: "Dia",
      accessorKey: "date_worked"
    },
    {
      header: "Entrada",
      accessorKey: "entry"
    },
    {
      header: "Saída",
      accessorKey: "exit"
    },
    {
      header: "Horas Trabalhadas",
      accessorKey: "hours_worked"
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <SheetTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                </SheetTrigger>
                <TooltipContent>
                  <p>Ver Histórico de descanso do dia</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <SheetContent className="max-w-[400px] sm:max-w-[540px]">
              <SheetHeader>
                <SheetTitle>Histórico de descanso do dia {row.original.date_worked}</SheetTitle>
              </SheetHeader>
              <SheetDescription>
                <DynamicTable columns={columns} data={data} />
              </SheetDescription>
            </SheetContent>
          </Sheet>
        );
      }
    }
  ];

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações do Empregado" backTo="/register/employees" />
          <div className="min-w-max flex flex-row gap-4">
            {employee && (
              <div className="w-1/2">
                <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">{employee.name}</CardTitle>
                      <CardDescription>
                        <div className="text-xs text-muted-foreground">
                          Data de registro: {new Date(employee.created_at).toLocaleString()}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                            <Dialog>
                              <Modal
                                typeModal="EDIT"
                                typeRegister="Employee"
                                nameModal="empregado"
                                rowData={employee}
                                idRowData={employee.id}
                              />
                            </Dialog>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                            <Dialog>
                              <Modal
                                typeModal="DELETE"
                                typeRegister="Employee"
                                nameModal="empregado"
                                rowData={employee}
                                idRowData={employee.id}
                                onDelete={() => {
                                  router.push("/register/employees");
                                }}
                              />
                            </Dialog>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Dados Gerais do Funcionário</div>
                      {employee && (
                        <DataList
                          items={[
                            {
                              title: "Identificador",
                              data: employee.id.toString()
                            },
                            { title: "Nome", data: employee.name },
                            {
                              title: "Telefone Fixo",
                              data: employee.phone
                                ? VMasker.toPattern(employee.phone, "(99) 9999-9999")
                                : "Não informado"
                            },
                            {
                              title: "Telefone Celular",
                              data: employee.cel_number
                                ? VMasker.toPattern(employee.cel_number, "(99) 99999-9999")
                                : "Não informado"
                            },
                            {
                              title: "CPF",
                              data: employee.cpf ? VMasker.toPattern(employee.cpf, "999.999.999-99") : "Não informado"
                            }
                          ]}
                        />
                      )}
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Outras informações</div>
                      {employee && (
                        <DataList
                          items={[
                            {
                              title: "Limite de Crédito",
                              data: `R$ ${employee.salary}`
                            },
                            {
                              title: "Data de Adimissão",
                              data: formatDate(new Date(employee.admission))
                            },
                            {
                              title: "Data de Desligamento",
                              data: employee.dismissal_date ? formatDate(new Date(employee.dismissal_date)) : "Ativo"
                            },
                            {
                              title: "Classificação",
                              data: employee.classification
                            },
                            {
                              title: "Salário",
                              data: employee.salary.toString()
                            }
                          ]}
                        />
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Última atualização:{" "}
                      <time dateTime={new Date(employee.updated_at).toString()}>
                        {new Date(employee.updated_at).toLocaleString()}
                      </time>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}
            <div className="w-1/2">
              <DynamicTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
