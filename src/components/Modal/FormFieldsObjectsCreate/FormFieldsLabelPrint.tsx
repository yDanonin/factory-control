"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsLabelPrintProps {
  form: UseFormReturn;
}

const help = fieldHelpTexts.labelPrint;

export const FormFieldsLabelPrint: React.FC<FormFieldsLabelPrintProps> = ({ form }) => {
  return (
    <>
      <FormField
        key="order_id"
        control={form.control}
        name="order_id"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="order_id" label="ID do Pedido" helpText={help.orderId} />
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


