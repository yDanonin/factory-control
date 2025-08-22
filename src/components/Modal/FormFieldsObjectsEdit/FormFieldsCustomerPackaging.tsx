"use client";

import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsCustomerPackagingProps {
  form: UseFormReturn;
}

export const FormFieldsCustomerPackaging: React.FC<FormFieldsCustomerPackagingProps> = ({ form }) => {
  return (
    <>
      <input type="hidden" {...form.register("customer_id", { valueAsNumber: true })} />
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


