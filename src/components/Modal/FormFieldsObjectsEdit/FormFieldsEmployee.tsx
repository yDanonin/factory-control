"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { withMask } from "use-mask-input";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Classification, Employee } from "@/types/employee.types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldsEmployee {
  form: UseFormReturn;
  rowData?: Partial<Employee>;
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

export const FormFieldsEmployee: React.FC<FormFieldsEmployee> = ({ form }) => {
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
        key="phone"
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="telefone">Número de Telefone</FormLabel>
            <FormControl>
              <Input id="phone" {...field} ref={withMask("(99) 9999-9999")} placeholder="ex. (99) 99999-9999" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="cel_number"
        control={form.control}
        name="cel_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="numero_celular">Número de Celular</FormLabel>
            <FormControl>
              <Input id="cel_number" {...field} ref={withMask("(99) 99999-9999")} placeholder="ex. (99) 9999-9999" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="cpf"
        control={form.control}
        name="cpf"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="cpf">Cpf</FormLabel>
            <FormControl>
              <Input id="cpf" {...field} ref={withMask("999.999.999-99")} placeholder="999.999.999-99" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="classification"
        control={form.control}
        name="classification"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="classification">Classification</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma classificação" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{mapEnumToSelectItems(Classification)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="salary"
        control={form.control}
        name="salary"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="salario">Salário</FormLabel>
              <FormControl>
                <div className="relative ml-auto flex-1">
                  <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground">R$</span>
                  <Input id="salary" type="number" {...field} className="w-full rounded-lg bg-background pl-8 pt-2.5" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="admission"
        control={form.control}
        name="admission"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-between">
            <FormLabel htmlFor="admission">Data de Admissão</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                  >
                    {field.value ? format(field.value, "PPP") : <span>Escolha uma data</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="dismissal_date"
        control={form.control}
        name="dismissal_date"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-between">
            <FormLabel htmlFor="dismissal_date">Data de Demissão</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                  >
                    {field.value ? format(field.value, "PPP") : <span>Escolha uma data</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
