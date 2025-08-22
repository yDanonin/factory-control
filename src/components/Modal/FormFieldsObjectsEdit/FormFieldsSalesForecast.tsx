"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalesForecastStatusLabel } from "@/types/sales-forecast.types";

interface FormFieldsSalesForecastProps {
  form: UseFormReturn;
}

export const FormFieldsSalesForecast: React.FC<FormFieldsSalesForecastProps> = ({ form }) => {
  return (
    <>
      <input type="hidden" {...form.register("customer_id", { valueAsNumber: true })} />
      <input type="hidden" {...form.register("product_id", { valueAsNumber: true })} />
      <FormField
        key="status"
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(SalesForecastStatusLabel).map(([key, label]) => (
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
      {/* Campos removidos: generated_at, generated_by */}
      <FormField
        key="reason"
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="reason">Motivo</FormLabel>
            <FormControl>
              <Input id="reason" {...field} placeholder="Motivo (opcional)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="next_estimated_date"
        control={form.control}
        name="next_estimated_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="next_estimated_date">Próxima data estimada</FormLabel>
            <FormControl>
              <Input
                id="next_estimated_date"
                type="date"
                {...field}
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="frequency_days"
        control={form.control}
        name="frequency_days"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="frequency_days">Frequência (dias)</FormLabel>
            <FormControl>
              <Input id="frequency_days" type="number" {...field} {...form.register("frequency_days", { valueAsNumber: true })} placeholder="Intervalo em dias (opcional)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="quantity"
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="quantity">Quantidade</FormLabel>
            <FormControl>
              <Input id="quantity" {...field} placeholder="Quantidade (decimal como string)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
    </>
  );
};


