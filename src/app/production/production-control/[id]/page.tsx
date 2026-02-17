"use client";

import React, { useEffect, useState } from "react";

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ProductionControl } from "@/types/production-control.types";

export default function Page({ params }: { params: { id: string } }) {
  const [pc, setPc] = useState<ProductionControl>();

  const router = useRouter();

  useEffect(() => {
    const fetchPc = async () => {
      const response = await fetch(`/api/production-control/${params.id}`);
      const data = await response.json();
      setPc(data);
    };

    fetchPc();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Detalhe do Controle de Produção" backTo="/production/production-control" />
          {pc && (
            <div>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Controle #{pc.id}
                    </CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Pedido: {pc.order?.id}
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
                        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                          <Modal typeModal="EDIT" typeRegister="ProductionControl" nameModal="controle de produção" rowData={pc} idRowData={pc.id} />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                          <Modal
                            typeModal="DELETE"
                            typeRegister="ProductionControl"
                            nameModal="controle de produção"
                            rowData={pc}
                            idRowData={pc.id}
                            onDelete={() => {
                              router.push("/production/production-control");
                            }}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Informações</div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>Status: {pc.status}</div>
                      <div>Disp. Material: {pc.material_disponibility}</div>
                      <div>Pedido: {pc.order?.id}</div>
                      <div>Criado em: {new Date(pc.created_at).toLocaleString()}</div>
                      <div>Atualizado em: {new Date(pc.updated_at).toLocaleString()}</div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">ID: {pc.id}</div>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


