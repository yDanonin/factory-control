"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsPackaging {
  form: UseFormReturn;
}

export const FormFieldsPackaging: React.FC<FormFieldsPackaging> = ({ form }) => {
  return (
    <>
      <FormField
        key="name"
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="name">Nome da Embalagem</FormLabel>
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
              <FormLabel htmlFor="quantity">Quantidade</FormLabel>
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
            <FormLabel htmlFor="storage_location">Local de Armazenamento</FormLabel>
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