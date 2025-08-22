"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsDeliveryPackaging {
  form: UseFormReturn;
}

export const FormFieldsDeliveryPackaging: React.FC<FormFieldsDeliveryPackaging> = ({ form }) => {
  return (
    <>
      {/* Campos necessários para o submit, mas ocultos na UI */}
      <input type="hidden" {...form.register("delivery_id", { valueAsNumber: true })} />
      <input type="hidden" {...form.register("packaging_id", { valueAsNumber: true })} />

      <FormField
        key="quantity"
        control={form.control}
        name="quantity"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="quantity">Quantidade</FormLabel>
              <FormControl>
                <Input
                  id="quantity"
                  type="number"
                  {...field}
                  {...form.register("quantity", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira a quantidade"
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
