import React from "react";

import { z } from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formCustomerSchema, formEmployeeSchema } from "@/schemas/FormSchemas";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { convertOptionsToBoolean, getBooleanLabel } from "@/services/booleanLabelService";
import { customerDefaultValues, employeeDefaultValues } from "@/schemas/DefaultValuesForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModalEditProps {
  nameModal: string;
  typeRegister: string;
}

export const Create: React.FC<ModalEditProps> = ({ nameModal, typeRegister }) => {
  let typeSchema: z.ZodType<Partial<Customer> | Partial<Employee>>;
  let objDefaultValues;

  if (typeRegister === "Customer") {
    typeSchema = formCustomerSchema;
    objDefaultValues = customerDefaultValues;
  } else if (typeRegister === "Employee") {
    typeSchema = formEmployeeSchema;
    objDefaultValues = employeeDefaultValues;
  } else {
    throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: objDefaultValues
  });

  async function onSubmit(data: z.infer<typeof typeSchema>) {
    const optionsToBoolean = convertOptionsToBoolean(data);
    try {
      await axios.post("/api/customers", optionsToBoolean);
    } catch (err) {
      console.error(err);
    }
  }

  const formFields = Object.entries(objDefaultValues).map(([fieldName, fieldValue]) => {
    console.log(fieldName, fieldValue);
    if (typeof fieldValue === "boolean") {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName as keyof typeof objDefaultValues}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={`${fieldName}`}>{fieldName}</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange}>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value={getBooleanLabel(fieldName, 0) as unknown as string}
                        id={`option-one-${fieldName}`}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{getBooleanLabel(fieldName, 0)}</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value={getBooleanLabel(fieldName, 1) as unknown as string}
                        id={`option-two-${fieldName}`}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{getBooleanLabel(fieldName, 1)}</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
      // corrigir isso depois
    } else if (fieldValue.length > 0) {
      <FormField
        control={form.control}
        name={fieldName as keyof typeof objDefaultValues}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />;
    } else if (fieldValue instanceof Date) {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={`${fieldName}` as keyof typeof objDefaultValues}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor={`${fieldName}`}>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (typeof fieldValue === "object") {
      const objectFields = Object.entries(fieldValue).map(([subFieldName, subFieldValue]) => {
        const fieldId = `${fieldName}.${subFieldName}`;
        const fieldKey = `${fieldName}.${subFieldName}` as keyof typeof objDefaultValues;

        if (typeof subFieldValue === "number") {
          return (
            <FormField
              key={fieldId}
              control={form.control}
              name={fieldKey}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={fieldId}>{subFieldName}</FormLabel>
                  <FormControl>
                    <Input
                      id={fieldId}
                      type="number"
                      {...field}
                      {...form.register(fieldKey, {
                        valueAsNumber: true
                      })}
                      placeholder={`Insira ${subFieldName}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        } else {
          return (
            <FormField
              key={fieldId}
              control={form.control}
              name={fieldKey}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={fieldId}>{subFieldName}</FormLabel>
                  <FormControl>
                    <Input id={fieldId} {...field} placeholder={`Insira ${subFieldName}`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        }
      });

      return <>{objectFields}</>;
    } else if (typeof fieldValue === "number") {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={`${fieldName}` as keyof typeof objDefaultValues}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor={`${fieldName}`}>{fieldName}</FormLabel>
                <FormControl>
                  <Input
                    id={fieldName}
                    type="number"
                    {...field}
                    {...form.register(fieldName, {
                      valueAsNumber: true
                    })}
                    placeholder={`Insira ${fieldName}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    } else {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName as keyof typeof objDefaultValues}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={`${fieldName}`}>{fieldName}</FormLabel>
              <FormControl>
                <Input id={fieldName} {...field} placeholder={`Insira ${fieldName}`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
  });

  return (
    <>
      <AlertDialogTrigger asChild>
        <Button variant="default">Criar {nameModal}</Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="min-w-full min-h-full">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Criando {nameModal}</AlertDialogTitle>
              <div className="grid grid-cols-3 gap-4">{formFields}</div>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute bottom-0 right-0 p-10">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction type="submit">Submit</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </Form>
    </>
  );
};
