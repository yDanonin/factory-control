"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Status } from "@/types/common.types";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldsMachine {
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

export const FormFieldsMachine: React.FC<FormFieldsMachine> = ({ form }) => {
  return (
    <>
      <FormField
        key="model"
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="model">Modelo</FormLabel>
            <FormControl>
              <Input id="model" {...field} placeholder="Insira o modelo" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="location"
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="location">Localização</FormLabel>
            <FormControl>
              <Input id="location" {...field} placeholder="Insira a localização" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="machine_number"
        control={form.control}
        name="machine_number"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="machine_number">Número da máquina</FormLabel>
              <FormControl>
                <Input
                  id="machine_number"
                  type="number"
                  {...field}
                  {...form.register("machine_number", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o número da máquina"
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
            <FormLabel htmlFor="status">Status</FormLabel>
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
      <FormField
        key="location_status"
        control={form.control}
        name="location_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="location_status">Status de Localização</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status de localização" />
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
