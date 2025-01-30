"use client";

import React, { useEffect, useState } from "react";

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
import axios from "axios";
import Spinner from "@/components/Spinner";

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

export const FormFieldsOrder: React.FC<FormFieldsOrder> = ({ form }) => {
  const [products, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axios.get("/api/products");
          console.log(resp)
          setProduct(resp.data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    const [selectedProducts, setSelectedProducts] = useState<{ productId: string; quantity: number }[]>([]);
    const addProduct = () => {setSelectedProducts([...selectedProducts, { productId: "", quantity: 1 }]);};
    const removeProduct = (index: number) => {setSelectedProducts(selectedProducts.filter((_, i) => i !== index));};
    const updateProduct = (index: number, field: string, value: any) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setSelectedProducts(updatedProducts);
    };

  return (
    <>
        {isLoading && (
          <div className="fullscreen-spinner">
            <Spinner visible={true} color="default" message="Loading Page..."/>
          </div>
        )}
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
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
        <div className="space-y-4">
        <FormLabel>Produtos</FormLabel>
        {selectedProducts.map((product, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Select
              value={product.productId}
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
                updateProduct(index, "quantity", parseInt(e.target.value) || 1)
              }
              className="w-20"
              min="1"
            />
            <Button type="button" onClick={() => removeProduct(index)} variant="destructive">
              Remover
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addProduct}>
          Adicionar Produto
        </Button>
        </div>
    </>
  );
};
