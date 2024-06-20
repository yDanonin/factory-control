"use client";

import Aside from "@/components/Aside";
import React, { useEffect, useState } from "react";
import { Employee } from "@/types/employee.types";
import DataList from "@/components/DataList"
import Header from "@/components/Header"
import Modal from "@/components/Modal/Modal";
import { AlertDialog } from "@/components/ui/alert-dialog";

import { useRouter } from 'next/navigation';

import VMasker from "vanilla-masker"; 
import { Separator } from "@/components/ui/separator";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Page({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<Employee>();
  
  const router = useRouter()

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`/api/employees/${params.id}`);
      const data = await response.json();
      console.log("AQUI:", data)
      setEmployee(data);
    };

    fetchEmployees();
  }, [params.id]);

  return (
  <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações do Empregado" backTo="/register/employees"/>
          {employee && <div>
            <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {employee.name}
                  </CardTitle>
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
                      <AlertDialog>
                        <Modal
                          typeModal="EDIT"
                          typeRegister="Employee"
                          nameModal="empregado"
                          rowData={employee}
                          idRowData={employee.id}
                        />
                      </AlertDialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                      <AlertDialog>
                        <Modal
                          typeModal="DELETE"
                          typeRegister="Employee"
                          nameModal="empregado"
                          rowData={employee}
                          idRowData={employee.id}
                          onDelete={() => { router.push('/register/employees') }}
                        />
                      </AlertDialog>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Dados Gerais do Funcionário</div>
                  {employee && <DataList items={[
                    {title: "Identificador", data: employee.id.toString()},
                    {title: "Nome", data: employee.name},
                    {title: "Telefone Fixo", data: employee.phone ? VMasker.toPattern(employee.phone, '(99) 9999-9999') : "Não informado"},
                    {title: "Telefone Celular", data: employee.cel_number ? VMasker.toPattern(employee.cel_number, '(99) 99999-9999') : "Não informado"},
                    {title: "CPF", data: employee.cpf ? VMasker.toPattern(employee.cpf, '999.999.999-99') : "Não informado" },
                  ]} />}
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Outras informações</div>
                  {employee && <DataList items={[
                    {title: "Limite de Crédito", data: `R$ ${employee.salary}`},
                    {title: "Data de Adimissão", data: new Date(employee.admission).toString()},
                    {title: "Data de Desligamento", data: employee.dismissal_date ? employee.dismissal_date.toString() : "Ativo"},
                    {title: "Classificação", data: employee.classification},
                    {title: "Salário", data: employee.salary.toString()}
                  ]} />}
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Última atualização: <time dateTime={new Date(employee.updated_at).toString()}>{new Date(employee.updated_at).toLocaleString()}</time>
                </div>
              </CardFooter>
            </Card>
          </div>}
        </div>
      </main>
    </div>
  )
}
