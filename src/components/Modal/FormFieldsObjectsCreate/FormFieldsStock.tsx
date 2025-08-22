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
      <FormField
        key="product_id"
        control={form.control}
        name="product_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="product_id">ID do Produto</FormLabel>
            <FormControl>
              <Input id="product_id" type="number" {...field} {...form.register("product_id", { valueAsNumber: true })} placeholder="Insira o ID do produto" />
            </FormControl>
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


