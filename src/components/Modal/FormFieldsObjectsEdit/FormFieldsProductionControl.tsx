"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsProductionControlProps {
  form: UseFormReturn;
}

export const FormFieldsProductionControl: React.FC<FormFieldsProductionControlProps> = ({ form }) => {
  return (
    <>
      <input type="hidden" {...form.register("order_id", { valueAsNumber: true })} />
      <FormField
        key="status"
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="status">Status</FormLabel>
            <FormControl>
              <Input id="status" type="number" {...field} {...form.register("status", { valueAsNumber: true })} placeholder="Insira o status" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="material_disponibility"
        control={form.control}
        name="material_disponibility"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="material_disponibility">Disponibilidade de Material</FormLabel>
            <FormControl>
              <Input id="material_disponibility" type="number" {...field} {...form.register("material_disponibility", { valueAsNumber: true })} placeholder="Insira a disponibilidade de material" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};


