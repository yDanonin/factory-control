import React from "react";

import { z } from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Status } from "@/types/common.types";
import { Vendor } from "@/types/vendor.types";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.types";
import { Machine } from "@/types/machine.types";
import { Customer } from "@/types/customer.types";
import { Procedure } from "@/types/procedure.types";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Classification, Employee } from "@/types/employee.types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatObject, getBooleanLabel } from "@/services/formatInputs";
import {
  formCustomerSchema,
  formEmployeeSchema,
  formMachineSchema,
  formProcedureSchema,
  formProductSchema,
  formVendorSchema
} from "@/schemas/FormSchemas";
import {
  customerDefaultValues,
  employeeDefaultValues,
  machineDefaultValues,
  procedureDefaultValues,
  productDefaultValues,
  vendorDefaultValues
} from "@/schemas/DefaultValuesForm";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

/* Explaining this component. First of all, formFields will create all the Inputs to forms
   with the type that it received from objDefaultValues. But some things that have to be clear,
   the order of some if's is important. So for example, the Date Input have to be before the object input.
   The application have only two enums as attributes in the actual system. So one of the if's is modified
   directly and not dynamically (the other one is in a rdio group).
*/
interface ModalEditProps {
  nameModal: string;
  typeRegister: string;
}

type EnumType<T> = {
  [key: string]: T;
};

// Função para mapear enum para SelectItem
function mapEnumToSelectItems<T extends string>(enumObj: EnumType<T>): JSX.Element[] {
  return Object.keys(enumObj).map((key) => (
    <SelectItem key={key} value={enumObj[key]}>
      {String(enumObj[key])}
    </SelectItem>
  ));
}

export const Create: React.FC<ModalEditProps> = ({ nameModal, typeRegister }) => {
  let typeSchema:
    | z.ZodType<Partial<Customer> | z.ZodType<Partial<Employee>> | z.ZodType<Partial<Machine>>>
    | z.ZodType<Partial<Procedure>>
    | z.ZodType<Partial<Product>>
    | z.ZodType<Partial<Vendor>>;
  let apiCallByType: string;
  let objDefaultValues;

  if (typeRegister === "Customer") {
    typeSchema = formCustomerSchema;
    objDefaultValues = customerDefaultValues;
    apiCallByType = "customers";
  } else if (typeRegister === "Employee") {
    typeSchema = formEmployeeSchema;
    objDefaultValues = employeeDefaultValues;
    apiCallByType = "employees";
  } else if (typeRegister === "Machine") {
    typeSchema = formMachineSchema;
    objDefaultValues = machineDefaultValues;
    apiCallByType = "machines";
  } else if (typeRegister === "Procedure") {
    typeSchema = formProcedureSchema;
    objDefaultValues = procedureDefaultValues;
    apiCallByType = "procedures";
  } else if (typeRegister === "Product") {
    typeSchema = formProductSchema;
    objDefaultValues = productDefaultValues;
    apiCallByType = "products";
  } else if (typeRegister === "Vendor") {
    typeSchema = formVendorSchema;
    objDefaultValues = vendorDefaultValues;
    apiCallByType = "vendors";
  } else {
    throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: objDefaultValues
  });
  async function onSubmit(data: z.infer<typeof typeSchema>) {
    // adicione no segundo argumento do formatObject os enums que devem ser tratados para serem enviados os seus indexes.
    const formattedData = formatObject(data, [Classification, Status]);
    try {
      await axios.post(`/backend/api/${apiCallByType}`, formattedData);
    } catch (err) {
      console.error(err);
    }
  }

  const formFields = Object.entries(objDefaultValues).map(([fieldName, fieldValue]) => {
    if (fieldName.includes("status") || fieldName.includes("classification")) {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName as keyof typeof objDefaultValues}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{fieldName}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma classificação" />
                  </SelectTrigger>
                </FormControl>
                {fieldName === "classification" ? (
                  <SelectContent>{mapEnumToSelectItems(Classification)}</SelectContent>
                ) : (
                  <SelectContent>{mapEnumToSelectItems(Status)}</SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
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
                      <RadioGroupItem value="true" id={`option-one-${fieldName}`} />
                    </FormControl>
                    <FormLabel className="font-normal">{getBooleanLabel(fieldName, 0)}</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" id={`option-two-${fieldName}`} />
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
    } else if (fieldValue instanceof Date) {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={`${fieldName}` as keyof typeof objDefaultValues}
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel htmlFor={`${fieldName}`}>{fieldName}</FormLabel>
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
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
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
