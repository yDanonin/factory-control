"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsPackaging {
  form: UseFormReturn;
}

const help = fieldHelpTexts.packaging;

export const FormFieldsPackaging: React.FC<FormFieldsPackaging> = ({ form }) => {
  return (
    <>
      <FormField
        key="name"
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="name" label="Nome da Embalagem" helpText={help.name} />
            <FormControl>
              <Input id="name" {...field} placeholder="Insira o nome da embalagem" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="quantity"
        control={form.control}
        name="quantity"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabelWithHelp htmlFor="quantity" label="Quantidade" helpText={help.quantity} />
              <FormControl>
                <Input
                  id="quantity"
                  type="number"
                  {...field}
                  {...form.register("quantity", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira a quantidade"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="storage_location"
        control={form.control}
        name="storage_location"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="storage_location" label="Local de Armazenamento" helpText={help.storageLocation} />
            <FormControl>
              <Input id="storage_location" {...field} placeholder="Insira o local de armazenamento" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}; 