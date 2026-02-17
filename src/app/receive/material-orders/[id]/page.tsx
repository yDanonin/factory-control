"use client";

import React, { useEffect, useState } from "react";

import VMasker from "vanilla-masker";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import DataList from "@/components/DataList";
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
import { MaterialOrder } from "@/types/material-order.types";

export default function Page({ params }: { params: { id: string } }) {
  const [materialOrder, setMaterialOrder] = useState<MaterialOrder>();

  const router = useRouter();

  useEffect(() => {
    const fetchMaterialOrders = async () => {
      const response = await fetch(`/api/material-orders/${params.id}`);
      const data = await response.json();
      setMaterialOrder(data);
    };

    fetchMaterialOrders();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações do Material Produtivo" backTo="/receive/material-orders" />
          {materialOrder && (
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">{materialOrder.id}</CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data de registro: {new Date(materialOrder.created_at).toLocaleString()}
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
                          <Modal
                            typeModal="EDIT"
                            typeRegister="MaterialOrder"
                            nameModal="pedido"
                            rowData={materialOrder}
                            idRowData={materialOrder.id}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                          <Modal
                            typeModal="DELETE"
                            typeRegister="MaterialOrder"
                            nameModal="pedido"
                            rowData={materialOrder}
                            idRowData={materialOrder.id}
                            onDelete={() => {
                              router.push("/receive/material-orders");
                            }}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Informações gerais</div>
                    {materialOrder && (
                      <DataList
                        items={[
                          { title: "Identificador", data: materialOrder.id.toString() },
                          { title: "Quantidade", data: materialOrder.amount.toString() },
                          { title: "Unidade de medida", data: materialOrder.unit.toString() },
                          { title: "Local de armazenamento", data: materialOrder.storage_location.toString() },
                          { title: "Recebido por", data: materialOrder.received_by.toString() },
                          { title: "ID do produto", data: materialOrder.product.id.toString() },
                          { title: "ID do fornecedor", data: materialOrder.vendor.id.toString() },
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Última atualização:{" "}
                    <time dateTime={new Date(materialOrder.updated_at).toString()}>
                      {new Date(materialOrder.updated_at).toLocaleString()}
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
