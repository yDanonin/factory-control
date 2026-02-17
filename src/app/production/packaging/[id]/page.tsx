"use client";

import React, { useEffect, useState } from "react";

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { MoreVertical, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import DataList from "@/components/DataList";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PackagingWithRelations } from "@/types/packaging.types";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export default function Page({ params }: { params: { id: string } }) {
  const [packaging, setPackaging] = useState<PackagingWithRelations>();

  const router = useRouter();

  useEffect(() => {
    const fetchPackaging = async () => {
      const response = await fetch(`/api/packaging/${params.id}`);
      const data = await response.json();
      setPackaging(data);
    };

    fetchPackaging();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações da Embalagem" backTo="/production/packaging" />
          {packaging && (
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">{packaging.name}</CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data de registro: {new Date(packaging.created_at).toLocaleString()}
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
                            typeRegister="Packaging"
                            nameModal="embalagem"
                            rowData={packaging}
                            idRowData={packaging.id}
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
                            typeRegister="Packaging"
                            nameModal="embalagem"
                            rowData={packaging}
                            idRowData={packaging.id}
                            onDelete={() => {
                              router.push("/production/packaging");
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
                    {packaging && (
                      <DataList
                        items={[
                          { title: "Identificador", data: packaging.id.toString() },
                          { title: "Nome", data: packaging.name },
                          { title: "Quantidade", data: packaging.quantity.toString() },
                          { title: "Local de Armazenamento", data: packaging.storage_location }
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold flex justify-between items-center">
                      <span>Clientes associados</span>
                      <Modal
                        typeModal="CREATE"
                        typeRegister="CustomerPackaging"
                        nameModal="cliente associado"
                        rowData={{ packaging_id: parseInt(params.id) }}
                        triggerLabel="Adicionar cliente"
                      />
                    </div>
                    {packaging && packaging.customers && packaging.customers.length > 0 ? (
                      <div className="space-y-2">
                        {packaging.customers.map((customerRelation) => (
                          <div key={customerRelation.id} className="border rounded p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-medium">{customerRelation.customer.name}</div>
                                <div className="text-sm text-muted-foreground">Loja: {customerRelation.customer.store_name}</div>
                                <div className="text-sm text-muted-foreground">Email: {customerRelation.customer.email}</div>
                                <div className="text-sm text-muted-foreground">Marca Pontalti: {customerRelation.pontalti_brand ? "Sim" : "Não"}</div>
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
                                          <span>Ver detalhes do cliente</span>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                          <DialogHeader>
                                            <DialogTitle>Detalhes do Cliente</DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <div className="grid gap-2">
                                              <div className="text-sm">ID Associação: {customerRelation.id}</div>
                                              <div className="text-sm">ID Cliente: {customerRelation.customer_id}</div>
                                              <div className="text-sm">ID Embalagem: {customerRelation.packaging_id}</div>
                                              <div className="text-sm">Criado em: {new Date(customerRelation.created_at).toLocaleString()}</div>
                                              <div className="text-sm">Atualizado em: {new Date(customerRelation.updated_at).toLocaleString()}</div>
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
                                        typeRegister="CustomerPackaging"
                                        nameModal="cliente associado"
                                        rowData={customerRelation}
                                        idRowData={customerRelation.id}
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
                                        typeRegister="CustomerPackaging"
                                        nameModal="cliente associado"
                                        idRowData={customerRelation.id}
                                        onDelete={() => {
                                          const fetchPackaging = async () => {
                                            const response = await fetch(`/api/packaging/${params.id}`);
                                            const data = await response.json();
                                            setPackaging(data);
                                          };
                                          fetchPackaging();
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
                      <div className="text-muted-foreground">Nenhum cliente associado</div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Última atualização:{" "}
                    <time dateTime={new Date(packaging.updated_at).toString()}>
                      {new Date(packaging.updated_at).toLocaleString()}
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