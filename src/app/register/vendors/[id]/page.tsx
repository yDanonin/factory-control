"use client";

import React, { useEffect, useState } from "react";

import VMasker from "vanilla-masker";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import DataList from "@/components/DataList";
import Modal from "@/components/Modal/Modal";
import { Vendor } from "@/types/vendor.types";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page({ params }: { params: { id: string } }) {
  const [vendor, setVendor] = useState<Vendor>();

  const router = useRouter();

  useEffect(() => {
    const fetchVendors = async () => {
      const response = await fetch(`/api/vendors/${params.id}`);
      const data = await response.json();
      setVendor(data);
    };

    fetchVendors();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações do Fornecedor" backTo="/register/vendors" />
          {vendor && (
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      {vendor.name}: {vendor.store_name}
                    </CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data de registro: {new Date(vendor.created_at).toLocaleString()}
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
                              typeRegister="Vendor"
                              nameModal="fornecedor"
                              rowData={vendor}
                              idRowData={vendor.id}
                            />
                          </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                          <Dialog>
                            <Modal
                              typeModal="DELETE"
                              typeRegister="Vendor"
                              nameModal="fornecedor"
                              rowData={vendor}
                              idRowData={vendor.id}
                              onDelete={() => {
                                router.push("/register/vendors");
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
                    <div className="font-semibold">Informações do Fornecedor</div>
                    {vendor && (
                      <DataList
                        items={[
                          { title: "Identificador", data: vendor.id.toString() },
                          { title: "Nome", data: vendor.name },
                          { title: "Nome da Loja", data: vendor.store_name },
                          {
                            title: "Telefone Fixo",
                            data: vendor.phone ? VMasker.toPattern(vendor.phone, "(99) 9999-9999") : "Não informado"
                          },
                          {
                            title: "Telefone Celular",
                            data: vendor.cel_number
                              ? VMasker.toPattern(vendor.cel_number, "(99) 99999-9999")
                              : "Não informado"
                          },
                          {
                            title: "CNPJ",
                            data: vendor.cnpj ? VMasker.toPattern(vendor.cnpj, "99.999.999/0001-99") : "Não informado"
                          }
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Informações de Venda e Faturamento</div>
                    {vendor && (
                      <DataList
                        items={[
                          { title: "Compras", data: `${vendor.purchases}%` },
                          { title: "Compras em volume", data: `${vendor.volume_purchases}%` },
                          { title: "Faturamento", data: `${vendor.invoicing}%` }
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">Endereço</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>{vendor.address.neighborhood}</span>
                        <span>
                          {vendor.address.address_number} {vendor.address.public_place}
                        </span>
                        <span>
                          {vendor.address.city}, {vendor.address.state}{" "}
                          {VMasker.toPattern(vendor.address.zip_code, "99999-999")}
                        </span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">Complemento</div>
                      <div className="text-muted-foreground">{vendor.address.complement}</div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Outras informações</div>
                    {vendor && (
                      <DataList
                        items={[
                          { title: "Status", data: vendor.status },
                          { title: "Entrega", data: vendor.deliver ? "Sim" : "Não" }
                        ]}
                      />
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Última atualização:{" "}
                    <time dateTime={new Date(vendor.updated_at).toString()}>
                      {new Date(vendor.updated_at).toLocaleString()}
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
