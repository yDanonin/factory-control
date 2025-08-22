"use client";

import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsDeliveryPackaging {
  form: UseFormReturn;
  deliveryId?: number;
}

export const FormFieldsDeliveryPackaging: React.FC<FormFieldsDeliveryPackaging> = ({ form, deliveryId }) => {
  // Preencher delivery_id automaticamente se fornecido
  useEffect(() => {
    if (deliveryId) {
      form.setValue("delivery_id", deliveryId);
    }
  }, [deliveryId, form]);

  return (
    <>
      <FormField
        key="packaging_id"
        control={form.control}
        name="packaging_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="packaging_id">ID da Embalagem</FormLabel>
              <FormControl>
                <Input
                  id="packaging_id"
                  type="number"
                  {...field}
                  {...form.register("packaging_id", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o ID da embalagem"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
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
    </>
  );
};
