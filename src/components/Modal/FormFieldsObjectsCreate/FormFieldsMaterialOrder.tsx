"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsMaterialOrder {
  form: UseFormReturn;
}

export const FormFieldsMaterialOrder: React.FC<FormFieldsMaterialOrder> = ({ form }) => {
  return (
    <>
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
          key="amount"
          control={form.control}
          name="amount"
          render={({ field }) => (
          <FormItem>
              <FormLabel htmlFor="amount">Quantidade</FormLabel>
              <FormControl>
                <Input
                    id="amount"
                    type="number"
                    {...field}
                    placeholder="Insira a quantidade"
                />
              </FormControl>
              <FormMessage />
          </FormItem>
          )}
        />

        <FormField
          key="unit"
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="unit">Unidade de medida</FormLabel>
              <FormControl>
                <Input id="unit" {...field} placeholder="Insira a unidade de medida"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          key="storage_location"
          control={form.control}
          name="storage_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="nome_loja">Local de armazenamento</FormLabel>
              <FormControl>
                <Input id="storage_location" {...field} placeholder="Insira o local de armazenamento"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          key="received_by"
          control={form.control}
          name="received_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="nome_loja">Recebido por</FormLabel>
              <FormControl>
                <Input id="received_by" {...field} placeholder="Insira o nome de quem recebeu"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          key="product_id"
          control={form.control}
          name="product_id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="product_id">ID do produto</FormLabel>
                <FormControl>
                  <Input
                    id="product_id"
                    type="number"
                    {...field}
                    {...form.register("product_id", {
                      valueAsNumber: true
                    })}
                    placeholder="Insira o ID do produto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />


        <FormField
          key="vendor_id"
          control={form.control}
          name="vendor_id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="vendor_id">ID do fornecedor</FormLabel>
                <FormControl>
                  <Input
                    id="vendor_id"
                    type="number"
                    {...field}
                    {...form.register("vendor_id", {
                      valueAsNumber: true
                    })}
                    placeholder="Insira o ID do fornecedor"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </>
  );
};
    