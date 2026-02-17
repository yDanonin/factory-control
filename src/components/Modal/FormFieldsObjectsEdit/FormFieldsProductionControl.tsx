"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsProductionControlProps {
  form: UseFormReturn;
}

const help = fieldHelpTexts.productionControl;

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
            <FormLabelWithHelp htmlFor="status" label="Status" helpText={help.status} />
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
            <FormLabelWithHelp htmlFor="material_disponibility" label="Disponibilidade de Material" helpText={help.material_disponibility} />
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
