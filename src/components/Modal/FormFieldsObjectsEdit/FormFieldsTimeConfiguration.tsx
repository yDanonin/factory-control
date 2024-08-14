"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsTimeConfiguration {
  form: UseFormReturn;
}


export const FormFieldsTimeConfiguration: React.FC<FormFieldsTimeConfiguration> = ({ form }) => {
  return (
    <>
      <FormField
        key="work_start"
        control={form.control}
        name="work_start"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="work_start">Inicio da jornada</FormLabel>
            <FormControl>
              <Input id="work_start" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        key="work_end"
        control={form.control}
        name="work_end"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="work_end">Fim do dia</FormLabel>
            <FormControl>
              <Input id="work_end" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        key="late_limit_in_minutes"
        control={form.control}
        name="late_limit_in_minutes"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="late_limit_in_minutes">Tempo limite de tolerância em minutos</FormLabel>
              <FormControl>
                <div className="relative ml-auto flex-1">
                  <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground"></span>
                  <Input id="late_limit_in_minutes" type="number" {...field} className="w-full rounded-lg bg-background pl-8 pt-2.5" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};
