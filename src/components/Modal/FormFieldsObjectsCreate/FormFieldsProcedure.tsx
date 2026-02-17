"use client";

import React from "react";

import { Status } from "@/types/common.types";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsProcedure {
  form: UseFormReturn;
}

type EnumType<T> = {
  [key: string]: T;
};

function mapEnumToSelectItems<T extends string>(enumObj: EnumType<T>): JSX.Element[] {
  return Object.keys(enumObj).map((key) => (
    <SelectItem key={key} value={enumObj[key]}>
      {String(enumObj[key])}
    </SelectItem>
  ));
}

const help = fieldHelpTexts.procedure;

export const FormFieldsProcedure: React.FC<FormFieldsProcedure> = ({ form }) => {
  return (
    <>
      <FormField
        key="process_name"
        control={form.control}
        name="process_name"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="process_name" label="Nome do Processo" helpText={help.processName} />
            <FormControl>
              <Input id="process_name" {...field} placeholder="Insira o nome do processo" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="workers"
        control={form.control}
        name="workers"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabelWithHelp htmlFor="workers" label="Número de trabalhadores" helpText={help.workers} />
              <FormControl>
                <Input
                  id="workers"
                  type="number"
                  {...field}
                  {...form.register("workers", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o número de trabalhadores"
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
            <FormLabelWithHelp htmlFor="status" label="Status" helpText={help.status} />
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status da máquina" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{mapEnumToSelectItems(Status)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
