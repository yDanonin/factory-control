"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Status } from "@/types/common.types";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldsProduct {
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

export const FormFieldsProduct: React.FC<FormFieldsProduct> = ({ form }) => {
  return (
    <>
      <FormField
        key="name"
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <FormControl>
              <Input id="name" {...field} placeholder="Insira o nome" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="model"
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="nome">Modelo</FormLabel>
            <FormControl>
              <Input id="model" {...field} placeholder="Insira o modelo" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="size"
        control={form.control}
        name="size"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="size">Tamanho</FormLabel>
            <FormControl>
              <Input id="name" {...field} placeholder="Insira o tamanho" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="sales"
        control={form.control}
        name="sales"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="sales">Número de vendas</FormLabel>
              <FormControl>
                <Input
                  id="sales"
                  type="number"
                  {...field}
                  {...form.register("sales", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o número de vendas"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="volume_sales"
        control={form.control}
        name="volume_sales"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="volume_sales">Número do volúme de vendas</FormLabel>
              <FormControl>
                <Input
                  id="volume_sales"
                  type="number"
                  {...field}
                  {...form.register("volume_sales", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o número do volúme de vendas"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="invoicing"
        control={form.control}
        name="invoicing"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="invoicing">Faturamento</FormLabel>
              <FormControl>
                <Input
                  id="invoicing"
                  type="number"
                  {...field}
                  {...form.register("invoicing", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o faturamento"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="character"
        control={form.control}
        name="character"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="character">Característica</FormLabel>
            <FormControl>
              <Input id="name" {...field} placeholder="Insira a característica" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="moldes"
        control={form.control}
        name="moldes"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="moldes">Moldes</FormLabel>
              <FormControl>
                <Input
                  id="moldes"
                  type="number"
                  {...field}
                  {...form.register("moldes", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira os moldes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="equivalency"
        control={form.control}
        name="equivalency"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="equivalency">Equivalência</FormLabel>
              <FormControl>
                <Input
                  id="equivalency"
                  type="number"
                  {...field}
                  {...form.register("equivalency", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira a equivalência"
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
                  <SelectValue placeholder="Selecione um status do produto" />
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
