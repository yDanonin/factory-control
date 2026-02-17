"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../PrintLabels.css";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import DataList from "@/components/DataList";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import { LabelPrint } from "@/types/label-print.types";

export default function Page({ params }: { params: { id: string } }) {
  const [labelPrint, setLabelPrint] = useState<LabelPrint | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/label-prints/${params.id}`);
        const json = await response.json();
        setLabelPrint(json?.data ?? json);
      } catch (err) {
        console.error("Erro ao buscar impressão de etiqueta:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      {isLoading && (
        <div className="fullscreen-spinner">
          <Spinner visible={true} color="default" message="Loading Page..." />
        </div>
      )}
      <div className="page-layout">
        <nav className="aside-layout">
          <Aside />
        </nav>
        <main className="main-layout">
          <div className="grid px-20 pb-4 gap-4 print-container">
            <div className="print-header">
              <div className="print-brand">
                <img src="/images/logo_pontalti_default.png" alt="Logo Pontalti" className="print-brand__icon" />
                <span className="print-brand__text">Pontalti</span>
              </div>
            </div>
            <div className="no-print">
              <Header title="Informações da Impressão de Etiqueta" backTo="/production/print-labels" />
            </div>
            {labelPrint && (
              <div className="print-area">
                <div className="print-content">
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">Impressão #{labelPrint.id}</CardTitle>
                      <CardDescription className="no-print">
                        <div className="text-xs text-muted-foreground">Pedido: #{labelPrint.order?.id}</div>
                      </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1 no-print">
                      <Button className="no-print" variant="default" onClick={() => window.print()}>Imprimir</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                            <Modal typeModal="EDIT" typeRegister="LabelPrint" nameModal="impressão de etiqueta" rowData={labelPrint} idRowData={labelPrint.id} />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                            <Modal
                              typeModal="DELETE"
                              typeRegister="LabelPrint"
                              nameModal="impressão de etiqueta"
                              rowData={labelPrint}
                              idRowData={labelPrint.id}
                              onDelete={() => {
                                router.push("/production/print-labels");
                              }}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Pedido</div>
                      <DataList
                        items={[
                          { title: "ID", data: String(labelPrint.order?.id ?? "-") },
                          { title: "Data", data: labelPrint.order?.date ? new Date(labelPrint.order.date).toLocaleDateString('pt-BR') : "-" },
                          { title: "Cliente", data: labelPrint.order?.customer?.name ?? "-" },
                          { title: "Total", data: labelPrint.order?.final_price !== undefined ? String(labelPrint.order.final_price) : "-" },
                          { title: "Itens", data: labelPrint.order?.items && labelPrint.order.items.length > 0 ? labelPrint.order.items.map((it) => `#${it.product_id} x${it.quantity}`).join(", ") : "-" },
                        ]}
                      />
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Cliente</div>
                      <DataList
                        items={[
                          { title: "ID", data: String(labelPrint.order?.customer?.id ?? "-") },
                          { title: "Nome", data: labelPrint.order?.customer?.name ?? "-" },
                          { title: "Email", data: labelPrint.order?.customer?.email ?? "-" },
                          { title: "Telefone", data: labelPrint.order?.customer?.phone ?? "-" },
                          { title: "Loja", data: labelPrint.order?.customer?.store_name ?? "-" },
                          { title: "CPF", data: labelPrint.order?.customer?.cpf ?? "-" },
                          { title: "CNPJ", data: labelPrint.order?.customer?.cnpj ?? "-" },
                        ]}
                      />
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Endereço de entrega</div>
                      <DataList
                        items={[
                          { title: "CEP", data: labelPrint.order?.customer?.address?.zip_code ?? "-" },
                          { title: "Rua", data: labelPrint.order?.customer?.address?.public_place ?? "-" },
                          { title: "Número", data: labelPrint.order?.customer?.address?.address_number !== undefined ? String(labelPrint.order?.customer?.address?.address_number) : "-" },
                          { title: "Bairro", data: labelPrint.order?.customer?.address?.neighborhood ?? "-" },
                          { title: "Cidade", data: labelPrint.order?.customer?.address?.city ?? "-" },
                          { title: "Estado", data: labelPrint.order?.customer?.address?.state ?? "-" },
                          { title: "Complemento", data: labelPrint.order?.customer?.address?.complement ?? "-" },
                        ]}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Última atualização: {" "}
                      <time dateTime={new Date(labelPrint.updated_at).toString()}>
                        {new Date(labelPrint.updated_at).toLocaleString()}
                      </time>
                    </div>
                  </CardFooter>
                </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}


