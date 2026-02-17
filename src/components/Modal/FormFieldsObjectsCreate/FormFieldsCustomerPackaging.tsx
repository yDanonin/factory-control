"use client";

import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsCustomerPackagingProps {
  form: UseFormReturn;
  packagingId?: number;
  customerId?: number;
}

const help = fieldHelpTexts.customerPackaging;

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
            <FormLabelWithHelp htmlFor="customer_id" label="ID do Cliente" helpText={help.customerId} />
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
            <FormLabelWithHelp htmlFor="pontalti_brand" label="Marca Pontalti?" helpText={help.pontaltiBrand} className="leading-none" />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};


