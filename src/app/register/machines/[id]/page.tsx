"use client";

import React, { useEffect, useState } from "react";

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import DataList from "@/components/DataList";
import Modal from "@/components/Modal/Modal";
import { Machine } from "@/types/machine.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page({ params }: { params: { id: string } }) {
  const [machine, setMachine] = useState<Machine>();

  const router = useRouter();

  useEffect(() => {
    const fetchMachines = async () => {
      const response = await fetch(`/api/machines/${params.id}`);
      const data = await response.json();
      setMachine(data);
    };

    fetchMachines();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações da Máquina" backTo="/register/machines" />
          {machine && (
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      {machine.model}: {machine.machine_number}
                    </CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data de registro: {new Date(machine.created_at).toLocaleString()}
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
                            typeRegister="Machine"
                            nameModal="maquina"
                            rowData={machine}
                            idRowData={machine.id}
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
                            typeRegister="Machine"
                            nameModal="maquina"
                            rowData={machine}
                            idRowData={machine.id}
                            onDelete={() => {
                              router.push("/register/machines");
                            }}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Informações da Máquina</div>
                    {machine && (
                      <DataList
                        items={[
                          { title: "Identificador", data: machine.id.toString() },
                          { title: "Status", data: machine.status === 0 || machine.status === "Suspenso" ? "Suspenso" : "Operacional" },
                          { title: "Localização", data: machine.location?.name || "Não definido" },
                          { title: "Status da localização", data: (() => {
                            // Se tiver location com status, usa o status da location
                            if (machine.location?.status) {
                              const locStatus = machine.location.status;
                              if (typeof locStatus === "string") return locStatus;
                              if (locStatus === 0) return "Suspenso";
                              if (locStatus === 1) return "Operacional";
                              return String(locStatus);
                            }
                            // Converte número para texto (enum: 0=Suspenso, 1=Operacional)
                            const status = machine.location_status;
                            if (status === "Operacional" || status === "Suspenso") return status;
                            if (status === 0 || status === "0") return "Suspenso";
                            if (status === 1 || status === "1") return "Operacional";
                            return status !== undefined && status !== null ? String(status) : "-";
                          })() }
                        ]}
                      />
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Última atualização:{" "}
                    <time dateTime={new Date(machine.updated_at).toString()}>
                      {new Date(machine.updated_at).toLocaleString()}
                    </time>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
