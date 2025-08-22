"use client";

import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsCustomerPackagingProps {
  form: UseFormReturn;
  packagingId?: number;
  customerId?: number;
}

export const FormFieldsCustomerPackaging: React.FC<FormFieldsCustomerPackagingProps> = ({ form, packagingId, customerId }) => {
  useEffect(() => {
    if (typeof packagingId === "number") {
      form.setValue("packaging_id", packagingId);
    }
    if (typeof customerId === "number") {
      form.setValue("customer_id", customerId);
    }
  }, [packagingId, customerId, form]);

  return (
    <>
      <FormField
        key="customer_id"
        control={form.control}
        name="customer_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="customer_id">ID do Cliente</FormLabel>
            <FormControl>
              <Input id="customer_id" type="number" {...field} {...form.register("customer_id", { valueAsNumber: true })} placeholder="Insira o ID do cliente" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* packaging_id é definido pelo contexto do detalhe da embalagem */}
      <input type="hidden" {...form.register("packaging_id", { valueAsNumber: true })} />
      <FormField
        key="pontalti_brand"
        control={form.control}
        name="pontalti_brand"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
            <FormControl>
              <Checkbox id="pontalti_brand" checked={!!field.value} onCheckedChange={(checked) => field.onChange(!!checked)} />
            </FormControl>
            <FormLabel htmlFor="pontalti_brand" className="leading-none">Marca Pontalti?</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};


