"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import VMasker from "vanilla-masker";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import DataList from "@/components/DataList";
import { MoreVertical } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee.types";
import { formatDate } from "@/services/formatDate";
import { Separator } from "@/components/ui/separator";
import ClocksEmployee, { EmployeeWorkHour } from "@/components/ClocksEmployee/ClocksEmployee";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DynamicTable from "@/components/DynamicTable";
import { MoreHorizontal } from "lucide-react";
import { DataRow, TableColumn } from "@/models/TableColumn";
import { Row } from "@tanstack/react-table";
import { Schedule } from "@/types/schedule.types";

export default function Page({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<Employee>();
  const [workHours, setWorkHours] = useState<EmployeeWorkHour[]>([]);
  const [data, setData] = useState<Schedule[]>();

  const router = useRouter();
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`/api/employees/${params.id}`);
      const data = await response.json();
      setEmployee(data);
    };

    const fetchEmployeeSchedules = async () => {
      const response = await fetch(`/api/employees/schedules/?employee_id=${params.id}`);
      const resp = await response.json();
      setData(resp);
    }

    const fetchWorkHours = async (employeeId: string) => {
      const endDate = moment().format("YYYY-MM-DD");
      const startDate = moment().subtract(3, "months").format("YYYY-MM-DD");

      try {
        const response = await axios.get(`/api/employees/work-hours`, {
          params: {
            employee_id: employeeId,
            startDate: startDate,
            endDate: endDate
          }
        });
        setWorkHours(response.data);
      } catch (error) {
        console.error("Error fetching work hours:", error);
      }
    };

    fetchEmployees().then(() => {
      fetchWorkHours(params.id);
    });
    fetchEmployeeSchedules()
  }, [params.id]);

  const columns = [
    {
      header: "Dia da Semana",
      accessorKey: "day_of_week"
    },
    {
      header: "Horário de entrada",
      accessorKey: "start_time"
    },
    {
      header: "Horário de saída",
      accessorKey: "end_time"
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
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <Modal
                  typeModal="EDIT"
                  typeRegister="TimeConfiguration"
                  nameModal="Tempo"
                  rowData={row.original}
                  idRowData={row.original.id}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ]

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
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(event) => event.preventDefault()}
                            onPointerLeave={(event) => event.preventDefault()}
                            onPointerMove={(event) => event.preventDefault()}
                          >
                            <Modal
                              typeModal="EDIT"
                              typeRegister="Employee"
                              nameModal="empregado"
                              rowData={employee}
                              idRowData={employee.id}
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(event) => event.preventDefault()}
                            onPointerLeave={(event) => event.preventDefault()}
                            onPointerMove={(event) => event.preventDefault()}
                          >
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
              <div className="text-muted-foreground text-center font-semibold mb-2">Histórico de Horas Trabalhadas</div>
              <ClocksEmployee data={workHours} id={params.id}/>
            </div>
          </div>

          <div className="text-muted-foreground text-center font-semibold mb-2">Horário do funcionário</div>
              {data && <DynamicTable
                columns={columns}
                data={data}
              />}
          </div>

      </main>
    </div>
  );
}
