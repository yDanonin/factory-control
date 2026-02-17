"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Status } from "@/types/common.types";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsLocationProps {
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

const PRESET_COLORS = [
  { label: "Azul", value: "#3b82f6" },
  { label: "Verde", value: "#22c55e" },
  { label: "Vermelho", value: "#ef4444" },
  { label: "Amarelo", value: "#eab308" },
  { label: "Roxo", value: "#a855f7" },
  { label: "Laranja", value: "#f97316" },
  { label: "Rosa", value: "#ec4899" },
  { label: "Cinza", value: "#6b7280" },
  { label: "Ciano", value: "#06b6d4" },
  { label: "Índigo", value: "#6366f1" },
];

const help = fieldHelpTexts.location;

export const FormFieldsLocation: React.FC<FormFieldsLocationProps> = ({ form }) => {
  return (
    <>
      <FormField
        key="name"
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="name" label="Nome" helpText={help.name} />
            <FormControl>
              <Input id="name" {...field} placeholder="Ex: Área de Produção A" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="code"
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="code" label="Código" helpText={help.code} />
            <FormControl>
              <Input id="code" {...field} placeholder="Ex: PROD-A" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
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
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{mapEnumToSelectItems(Status)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="width"
        control={form.control}
        name="width"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="width" label="Largura (px)" helpText={help.width} />
            <FormControl>
              <Input
                id="width"
                type="number"
                {...field}
                {...form.register("width", { valueAsNumber: true })}
                placeholder="150"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="height"
        control={form.control}
        name="height"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="height" label="Altura (px)" helpText={help.height} />
            <FormControl>
              <Input
                id="height"
                type="number"
                {...field}
                {...form.register("height", { valueAsNumber: true })}
                placeholder="120"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="color"
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="color" label="Cor" helpText={help.color} />
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a cor" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PRESET_COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
