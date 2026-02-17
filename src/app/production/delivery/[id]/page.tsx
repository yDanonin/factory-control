"use client";

import React, { useEffect, useState } from "react";

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { MoreVertical, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import DataList from "@/components/DataList";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Delivery, DeliveryStatusLabel } from "@/types/delivery.types";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page({ params }: { params: { id: string } }) {
  const [delivery, setDelivery] = useState<Delivery>();

  const router = useRouter();

  useEffect(() => {
    const fetchDelivery = async () => {
      const response = await fetch(`/api/delivery/${params.id}`);
      const data = await response.json();
      setDelivery(data);
    };

    fetchDelivery();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações da Entrega" backTo="/production/delivery" />
          {delivery && (
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Entrega #{delivery.id} - Pedido #{delivery.order_id}
                    </CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data de registro: {new Date(delivery.created_at).toLocaleString()}
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
                            typeRegister="Delivery"
                            nameModal="entrega"
                            rowData={delivery}
                            idRowData={delivery.id}
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
                            typeRegister="Delivery"
                            nameModal="entrega"
                            rowData={delivery}
                            idRowData={delivery.id}
                            onDelete={() => {
                              router.push("/production/delivery");
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
                    {delivery && (
                      <DataList
                        items={[
                          { title: "Identificador", data: delivery.id.toString() },
                          { title: "ID do Pedido", data: delivery.order_id.toString() },
                          { title: "Status", data: DeliveryStatusLabel[delivery.status as keyof typeof DeliveryStatusLabel] || delivery.status.toString() },
                          { title: "Data de Entrega", data: new Date(delivery.delivery_date).toLocaleDateString('pt-BR') }
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Informações do Pedido</div>
                    {delivery && delivery.order && (
                      <DataList
                        items={[
                          { title: "Preço Final", data: `R$ ${delivery.order.final_price}` },
                          { title: "Data do Pedido", data: new Date(delivery.order.date).toLocaleDateString('pt-BR') },
                          { title: "Cliente", data: delivery.order.customer.name }
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold flex justify-between items-center">
                      <span>Embalagens da Entrega</span>
                      <Modal
                        typeModal="CREATE"
                        typeRegister="DeliveryPackaging"
                        nameModal="embalagem da entrega"
                        rowData={{ delivery_id: parseInt(params.id) }}
                        triggerLabel="Adicionar embalagem"
                      />
                    </div>
                    {delivery && delivery.packagings && delivery.packagings.length > 0 ? (
                      <div className="space-y-2">
                        {delivery.packagings.map((deliveryPackaging) => (
                          <div key={deliveryPackaging.id} className="border rounded p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-medium">{deliveryPackaging.packaging.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Quantidade: {deliveryPackaging.quantity}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Local de Armazenamento: {deliveryPackaging.packaging.storage_location}
                                </div>
                              </div>
                              <div className="flex gap-2 ml-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Ver mais</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="cursor-pointer"
                                      onSelect={(event) => event.preventDefault()}
                                      onPointerLeave={(event) => event.preventDefault()}
                                      onPointerMove={(event) => event.preventDefault()}
                                    >
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <span>Ver detalhes da embalagem</span>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                          <DialogHeader>
                                            <DialogTitle>Detalhes da Embalagem</DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <div className="grid gap-4">
                                              <div className="space-y-2">
                                                <h3 className="text-lg font-semibold">{deliveryPackaging.packaging.name}</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">Quantidade</label>
                                                    <p className="text-sm">{deliveryPackaging.quantity}</p>
                                                  </div>
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">Local de Armazenamento</label>
                                                    <p className="text-sm">{deliveryPackaging.packaging.storage_location}</p>
                                                  </div>
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">Quantidade Total da Embalagem</label>
                                                    <p className="text-sm">{deliveryPackaging.packaging.quantity}</p>
                                                  </div>
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">ID da Embalagem</label>
                                                    <p className="text-sm">{deliveryPackaging.packaging.id}</p>
                                                  </div>
                                                </div>
                                              </div>
                                              <Separator />
                                              <div className="space-y-2">
                                                <h4 className="font-medium">Informações da Associação</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">ID da Associação</label>
                                                    <p className="text-sm">{deliveryPackaging.id}</p>
                                                  </div>
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">ID da Entrega</label>
                                                    <p className="text-sm">{deliveryPackaging.delivery_id}</p>
                                                  </div>
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">Data de Criação</label>
                                                    <p className="text-sm">{new Date(deliveryPackaging.created_at).toLocaleString()}</p>
                                                  </div>
                                                  <div>
                                                    <label className="text-sm font-medium text-muted-foreground">Última Atualização</label>
                                                    <p className="text-sm">{new Date(deliveryPackaging.updated_at).toLocaleString()}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="cursor-pointer"
                                      onSelect={(event) => event.preventDefault()}
                                      onPointerLeave={(event) => event.preventDefault()}
                                      onPointerMove={(event) => event.preventDefault()}
                                    >
                                      <Modal
                                        typeModal="EDIT"
                                        typeRegister="DeliveryPackaging"
                                        nameModal="embalagem da entrega"
                                        rowData={deliveryPackaging}
                                        idRowData={deliveryPackaging.id}
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
                                        typeRegister="DeliveryPackaging"
                                        nameModal="embalagem da entrega"
                                        rowData={deliveryPackaging}
                                        idRowData={deliveryPackaging.id}
                                        onDelete={() => {
                                          // Recarregar os dados da entrega após deletar
                                          const fetchDelivery = async () => {
                                            const response = await fetch(`/api/delivery/${params.id}`);
                                            const data = await response.json();
                                            setDelivery(data);
                                          };
                                          fetchDelivery();
                                        }}
                                      />
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground">Nenhuma embalagem associada</div>
                    )}
                  </div>

                  {/* Modal de Criação antigo removido */}
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Última atualização:{" "}
                    <time dateTime={new Date(delivery.updated_at).toString()}>
                      {new Date(delivery.updated_at).toLocaleString()}
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