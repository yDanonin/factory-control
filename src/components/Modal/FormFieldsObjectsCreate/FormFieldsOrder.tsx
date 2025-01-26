"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Product } from "@/types/product.types";
import { Status } from "@/types/common.types";
import { OrderItem } from "@/types/order-item.types";

interface FormFieldsOrder {
  form: UseFormReturn;
}

type EnumType<T> = {
  [key: string]: T;
};

function mapEnumToSelectItems<T extends string>(enumObj: EnumType<T>): JSX.Element[] {
  return Object.keys(enumObj).map((key) => (
    <SelectItem key={key} value={enumObj[key]}>
      {String(enumObj[key])}
    </SelectItem>
  ));
}

// Fixed list of products
const products: Product[] = [
    { id: 1, status: Status.operacional, volume_sales: 0, sales: 0, invoicing: 0, name: "Product A", model: "Model A", size: "A", character: "A", moldes: 1, equivalency: 1, created_at: new Date(), updated_at: new Date() },
    { id: 2, status: Status.operacional, volume_sales: 0, sales: 0, invoicing: 0, name: "Product B", model: "Model A", size: "A", character: "A", moldes: 1, equivalency: 1, created_at: new Date(), updated_at: new Date() },
    { id: 3, status: Status.operacional, volume_sales: 0, sales: 0, invoicing: 0, name: "Product C", model: "Model A", size: "A", character: "A", moldes: 1, equivalency: 1, created_at: new Date(), updated_at: new Date() },
];

export const FormFieldsOrder: React.FC<FormFieldsOrder> = ({ form }) => {
    const [selectedProducts, setSelectedProducts] = useState<OrderItem[]>([]);
    const addProduct = () => {setSelectedProducts([...selectedProducts, { product_id: "", quantity: undefined }]);};
    const removeProduct = (index: number) => {setSelectedProducts(selectedProducts.filter((_, i) => i !== index));};
    const updateProduct = (index: number, field: string, value: any) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index] = { 
          ...updatedProducts[index], 
          [field]: value 
        };
        setSelectedProducts(updatedProducts);
    };

  return (
    <>
        <FormField
            key="final_price"
            control={form.control}
            name="final_price"
            render={({ field }) => (
            <FormItem>
                <FormLabel htmlFor="final_price">Preço Final</FormLabel>
                <FormControl>
                    <div className="relative ml-auto flex-1">
                    <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground">R$</span>
                    <Input
                        id="final_price"
                        type="number"
                        {...field}
                        className="w-full rounded-lg bg-background pl-8 pt-2.5"
                    />
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            key="date"
            control={form.control}
            name="date"
            render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
                <FormLabel htmlFor="date">Data do Pedido</FormLabel>
                <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                        {field.value ? format(field.value, "PPP") : <span>Escolha uma data</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
        key="csutomer_id"
        control={form.control}
        name="customer_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="customer_id">ID do cliente</FormLabel>
              <FormControl>
                <Input
                  id="customer_id"
                  type="number"
                  {...field}
                  {...form.register("customer_id", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o ID do cliente"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
        <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Produtos</FormLabel>
                  <Button type="button" onClick={addProduct}>
                    Adicionar Produto
                  </Button>
                </div>
                <div className="max-h-[200px] overflow-y-auto space-y-4">
                {selectedProducts.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Select
                      value={product.product_id.toString()}
                      onValueChange={(value) => updateProduct(index, "productId", value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id.toString()}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProduct(index, "quantity", parseInt(e.target.value))
                      }
                      className="w-20"
                      placeholder="Qtd."
                    />
                    <Button type="button" onClick={() => removeProduct(index)} variant="destructive">
                      Remover
                    </Button>
                  </div>
                ))}
                </div>
              </div>
            </FormItem>
           )}
        />
      </>
  );
};
