"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FormFieldsVacation {
  form: UseFormReturn;
}

export const FormFieldsVacation: React.FC<FormFieldsVacation> = ({ form }) => {
  return (
    <>
      <FormField
        key="employee_id"
        control={form.control}
        name="employee_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="employee_id">Id do funcionário</FormLabel>
              <FormControl>
                <div className="relative ml-auto flex-1">
                  <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground"></span>
                  <Input
                    id="employee_id"
                    type="number"
                    {...field}
                    className="w-full rounded-lg bg-background pl-8 pt-2.5"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        key="sold_days"
        control={form.control}
        name="sold_days"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="sold_days">Quantidade de dias vendidos</FormLabel>
              <FormControl>
                <div className="relative ml-auto flex-1">
                  <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground"></span>
                  <Input
                    id="sold_days"
                    type="number"
                    {...field}
                    className="w-full rounded-lg bg-background pl-8 pt-2.5"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        key="start_date"
        control={form.control}
        name="start_date"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-between">
            <FormLabel htmlFor="start_date">Data de inicio</FormLabel>
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
        key="end_date"
        control={form.control}
        name="end_date"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-between">
            <FormLabel htmlFor="end_date">Data final</FormLabel>
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
