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
import { Dialog } from "@/components/ui/dialog";
import { Order } from "@/types/order.types";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page({ params }: { params: { id: string } }) {
  const [order, setorder] = useState<Order>();

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders/${params.id}`);
      const data = await response.json();
      setorder(data);
    };

    fetchOrders();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações do Pedido" backTo="/receive/orders" />
          {order && (
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">{order.id}</CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data de registro: {new Date(order.created_at).toLocaleString()}
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
                              typeRegister="Order"
                              nameModal="pedido"
                              rowData={order}
                              idRowData={order.id}
                            />
                          </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                          <Dialog>
                            <Modal
                              typeModal="DELETE"
                              typeRegister="Order"
                              nameModal="pedido"
                              rowData={order}
                              idRowData={order.id}
                              onDelete={() => {
                                router.push("/receive/orders");
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
                    <div className="font-semibold">Informações gerais</div>
                    {order && (
                      <DataList
                        items={[
                          { title: "Identificador", data: order.id.toString() },
                          { title: "ID do Cliente", data: order.customer_id.toString() },
                          { title: "valor final", data: order.final_price.toString() },
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Última atualização:{" "}
                    <time dateTime={new Date(order.updated_at).toString()}>
                      {new Date(order.updated_at).toLocaleString()}
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
