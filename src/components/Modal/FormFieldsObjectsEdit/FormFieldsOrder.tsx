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
import { OrderItem } from "@/types/order-item.types";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axios.get("/api/products");
          setProducts(resp.data.data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const resp = await axios.get("/api/products");
              setProducts(resp.data.data);
          } catch (err) {
              console.error(err);
          }
      };
      fetchProducts();
    }, []);
  
    useEffect(() => {
      form.setValue('products', selectedProducts);
    }, [selectedProducts, form]);
  
    useEffect(() => {
      const currentProducts = form.getValues('products');
      if (currentProducts?.length) {
        setSelectedProducts(currentProducts);
      }
    }, []);
  
    useEffect(() => {
      const formValues = form.getValues();
    }, [form, selectedProducts]);

    const addProduct = () => {
      const newProducts = [...selectedProducts, { product_id: 0, quantity: 0 }];
      setSelectedProducts(newProducts);
      form.setValue('products', newProducts);
    };
    const removeProduct = (index: number, field: string, value: number) => {
      const newProducts = selectedProducts.filter((_, i) => i !== index);
      setSelectedProducts(newProducts);
      form.setValue('products', newProducts);
    };
    const updateProduct = (index: number, field: string, value: any) => {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index] = { 
        ...updatedProducts[index], 
        [field]: field === 'product_id' ? Number(value) : value
      };
      setSelectedProducts(updatedProducts);
      form.setValue('products', updatedProducts);
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
        {products && (
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
                      onValueChange={(value) => {
                        updateProduct(index, "product_id", parseInt(value));
                        field.onChange(selectedProducts);
                      }}
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
                      onChange={(e) => {
                        updateProduct(index, "quantity", parseInt(e.target.value));
                        field.onChange(selectedProducts);
                      }}
                      className="w-20"
                      placeholder="Qtd."
                    />
                    <Button type="button" onClick={() => removeProduct(index, 'product_id', selectedProducts[index].product_id)} variant="destructive">
                      Remover
                    </Button>
                  </div>
                ))}
                </div>
              </div>
            </FormItem>
           )}
        />)}
    </>
  );
};
