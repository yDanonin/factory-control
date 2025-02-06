"use client";

import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReturnedLabel } from "@/types/returned_labels.types";

interface FormFieldsPayment {
  form: UseFormReturn;
}

export const FormFieldsPayment: React.FC<FormFieldsPayment> = ({ form }) => {
  return (
    <>
        <FormField
          key="amount_paid"
          control={form.control}
          name="amount_paid"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="amount_paid">Total pago</FormLabel>
                <FormControl>
                  <div className="relative ml-auto flex-1">
                    <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground">R$</span>
                    <Input
                      id="amount_paid"
                      type="number"
                      {...field}
                      className="w-full rounded-lg bg-background pl-8 pt-2.5"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
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
          key="payment_method"
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="payment_method">Método de pagamento</FormLabel>
              <FormControl>
                <Input id="payment_method" {...field} placeholder="Insira o metodo de pagamento"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          key="order_id"
          control={form.control}
          name="order_id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="order_id">ID do pedido</FormLabel>
                <FormControl>
                  <Input
                    id="order_id"
                    type="number"
                    {...field}
                    {...form.register("order_id", {
                      valueAsNumber: true
                    })}
                    placeholder="Insira o ID do pedido"
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
    