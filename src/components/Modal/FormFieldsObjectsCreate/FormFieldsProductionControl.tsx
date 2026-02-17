"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsProductionControlProps {
  form: UseFormReturn;
}

const help = fieldHelpTexts.productionControl;

export const FormFieldsProductionControl: React.FC<FormFieldsProductionControlProps> = ({ form }) => {
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
            <FormLabelWithHelp htmlFor="material_disponibility" label="Disponibilidade de Material" helpText={help.materialDisponibility} />
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


