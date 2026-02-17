"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeliveryStatus, DeliveryStatusLabel } from "@/types/delivery.types";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsDelivery {
  form: UseFormReturn;
}

const help = fieldHelpTexts.delivery;

export const FormFieldsDelivery: React.FC<FormFieldsDelivery> = ({ form }) => {
  return (
    <>
      <FormField
        key="order_id"
        control={form.control}
        name="order_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabelWithHelp htmlFor="order_id" label="ID do Pedido" helpText={help.order_id} />
              <FormControl>
                <Input
                  id="order_id"
                  type="number"
                  {...field}
                  {...form.register("order_id", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o ID do pedido"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="status"
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="status" label="Status da Entrega" helpText={help.status} />
            <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status da entrega" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(DeliveryStatusLabel).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="delivery_date"
        control={form.control}
        name="delivery_date"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="delivery_date" label="Data de Entrega" helpText={help.delivery_date} />
            <FormControl>
              <Input
                id="delivery_date"
                type="date"
                {...field}
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
