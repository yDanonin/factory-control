"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsStockProps {
  form: UseFormReturn;
}

export const FormFieldsStock: React.FC<FormFieldsStockProps> = ({ form }) => {
  return (
    <>
      <input type="hidden" {...form.register("product_id", { valueAsNumber: true })} />
      <FormField
        key="amount"
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="amount">Quantidade</FormLabel>
            <FormControl>
              <Input id="amount" type="number" {...field} {...form.register("amount", { valueAsNumber: true })} placeholder="Insira a quantidade" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="location"
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="location">Local</FormLabel>
            <FormControl>
              <Input id="location" {...field} placeholder="Insira o local" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};


