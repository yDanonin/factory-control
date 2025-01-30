"use client";

import React, { useEffect, useState } from "react";

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import DataList from "@/components/DataList";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Payment } from "@/types/payment.types";

export default function Page({ params }: { params: { id: string } }) {
  const [payment, setPayment] = useState<Payment>();

  const router = useRouter();

  useEffect(() => {
    const fetchPayment = async () => {
      const response = await fetch(`/api/payments/${params.id}`);
      const data = await response.json();
      setPayment(data);
    };

    fetchPayment();
  }, [params.id]);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações do Pagamento" backTo="/receive/payments" />
          {payment && (
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">{payment.id}</CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data de registro: {new Date(payment.created_at).toLocaleString()}
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
                              typeRegister="Payment"
                              nameModal="pedido"
                              rowData={payment}
                              idRowData={payment.id}
                            />
                          </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                          <Dialog>
                            <Modal
                              typeModal="DELETE"
                              typeRegister="Payment"
                              nameModal="pedido"
                              rowData={payment}
                              idRowData={payment.id}
                              onDelete={() => {
                                router.push("/receive/payments");
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
                    {payment && (
                      <DataList
                        items={[
                          { title: "Identificador", data: payment.id.toString() },
                          { title: "ID do pedido", data: payment.order.id.toString() },
                          { title: "Total pago", data: payment.amount_paid.toString() },
                          { title: "Restante a ser pago", data: payment.remaining.toString() },
                          { title: "Metodo de pagamento", data: payment.payment_method.toString() },
                        ]}
                      />
                    )}
                  </div>
                  <Separator className="my-4" />
                </CardContent>
                <CardFooter className="flex flex-row items-center bpayment-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Última atualização:{" "}
                    <time dateTime={new Date(payment.updated_at).toString()}>
                      {new Date(payment.updated_at).toLocaleString()}
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
