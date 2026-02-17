"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsTimeConfiguration {
  form: UseFormReturn;
}

const help = fieldHelpTexts.timeConfiguration;

export const FormFieldsTimeConfiguration: React.FC<FormFieldsTimeConfiguration> = ({ form }) => {
  return (
    <>
      <FormField
        key="work_start"
        control={form.control}
        name="work_start"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="work_start" label="Horário de Entrada" helpText={help.work_start} />
            <FormControl>
              <Input id="work_start" type="time" {...field} />
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
            <FormLabelWithHelp htmlFor="work_end" label="Horário de Saída" helpText={help.work_end} />
            <FormControl>
              <Input id="work_end" type="time" {...field} />
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
              <FormLabelWithHelp htmlFor="late_limit_in_minutes" label="Tempo limite de tolerância em minutos" helpText={help.late_limit_in_minutes} />
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
