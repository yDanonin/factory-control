"use client";

import Aside from "@/components/Aside";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product.types";
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
  const [product, setProduct] = useState<Product>();
  
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProducts();
  }, [params.id]);

  return (
  <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Informações do Produto" backTo="/register/products"/>
          {product && <div>
            <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {product.name}
                  </CardTitle>
                  <CardDescription>
                    <div className="text-xs text-muted-foreground">
                      Data de registro: {new Date(product.created_at).toLocaleString()}
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
                          typeRegister="Product"
                          nameModal="produto"
                          rowData={product}
                          idRowData={product.id}
                        />
                      </AlertDialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                      <AlertDialog>
                        <Modal
                          typeModal="DELETE"
                          typeRegister="Product"
                          nameModal="produto"
                          rowData={product}
                          idRowData={product.id}
                          onDelete={() => { router.push('/register/products') }}
                        />
                      </AlertDialog>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Informações do Produto</div>
                  {product && <DataList items={[
                    {title: "Identificador", data: product.id.toString()},
                    {title: "Nome", data: product.name},
                    {title: "Modelo", data: product.model},
                    {title: "Tamanho", data: product.size},
                    {title: "Caracteristica", data: product.character},
                    {title: "Moldes", data: product.moldes.toString()},
                    {title: "Equivalencia", data: product.equivalency.toString()},
                  ]} />}
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Informações de Venda e Faturamento</div>
                  {product && <DataList items={[
                    {title: "% de Vendas", data: `${product.sales}%`},
                    {title: "% de Vendas em volume", data: `${product.volume_sales}%`},
                    {title: "% do Faturamento", data: `${product.invoicing}%`}
                  ]} />}
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Outras informações</div>
                  {product && <DataList items={[
                    {title: "Status", data: product.status}
                  ]} />}
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Última atualização: <time dateTime={new Date(product.updated_at).toString()}>{new Date(product.updated_at).toLocaleString()}</time>
                </div>
              </CardFooter>
            </Card>
          </div>}
        </div>
      </main>
    </div>
  )
}
