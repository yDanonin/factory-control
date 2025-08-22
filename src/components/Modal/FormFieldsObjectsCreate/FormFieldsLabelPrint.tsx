"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsLabelPrintProps {
  form: UseFormReturn;
}

export const FormFieldsLabelPrint: React.FC<FormFieldsLabelPrintProps> = ({ form }) => {
  return (
    <>
      <FormField
        key="order_id"
        control={form.control}
        name="order_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="order_id">ID do Pedido</FormLabel>
            <FormControl>
              <Input id="order_id" type="number" {...field} {...form.register("order_id", { valueAsNumber: true })} placeholder="Insira o ID do pedido" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};


