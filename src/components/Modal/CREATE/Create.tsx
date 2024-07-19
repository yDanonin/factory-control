"use client";

import React, { useState } from "react";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Status } from "@/types/common.types";
import { Vendor } from "@/types/vendor.types";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.types";
import { Machine } from "@/types/machine.types";
import { Customer } from "@/types/customer.types";
import { Procedure } from "@/types/procedure.types";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatObject } from "@/services/formatInputs";
import { Classification, Employee } from "@/types/employee.types";
import { FormFieldsVendor } from "../FormFieldsObjectsCreate/FormFieldsVendor";
import { FormFieldsProduct } from "../FormFieldsObjectsCreate/FormFieldsProduct";
import { FormFieldsMachine } from "../FormFieldsObjectsCreate/FormFieldsMachine";
import { FormFieldsEmployee } from "../FormFieldsObjectsCreate/FormFieldsEmployee";
import { FormFieldsCustomer } from "../FormFieldsObjectsCreate/FormFieldsCustomer";
import { FormFieldsProcedure } from "../FormFieldsObjectsCreate/FormFieldsProcedure";
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
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

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

export const Create: React.FC<ModalEditProps> = ({ nameModal, typeRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  let typeSchema:
    | z.ZodType<Partial<Customer> | z.ZodType<Partial<Employee>> | z.ZodType<Partial<Machine>>>
    | z.ZodType<Partial<Procedure>>
    | z.ZodType<Partial<Product>>
    | z.ZodType<Partial<Vendor>>;

  let apiCallByType: string;
  let objDefaultValues;
  let formFields1;

  switch (typeRegister) {
    case "Customer":
      typeSchema = formCustomerSchema;
      objDefaultValues = customerDefaultValues;
      apiCallByType = "customers";
      break;
    case "Employee":
      typeSchema = formEmployeeSchema;
      objDefaultValues = employeeDefaultValues;
      apiCallByType = "employees";
      break;
    case "Machine":
      typeSchema = formMachineSchema;
      objDefaultValues = machineDefaultValues;
      apiCallByType = "machines";
      break;
    case "Procedure":
      typeSchema = formProcedureSchema;
      objDefaultValues = procedureDefaultValues;
      apiCallByType = "procedures";
      break;
    case "Product":
      typeSchema = formProductSchema;
      objDefaultValues = productDefaultValues;
      apiCallByType = "products";
      break;
    case "Vendor":
      typeSchema = formVendorSchema;
      objDefaultValues = vendorDefaultValues;
      apiCallByType = "vendors";
      break;
    default:
      throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: objDefaultValues,
    disabled: isLoading
  });

  switch (typeRegister) {
    case "Customer":
      formFields1 = <FormFieldsCustomer form={form} />;
      break;
    case "Employee":
      formFields1 = <FormFieldsEmployee form={form} />;
      break;
    case "Machine":
      formFields1 = <FormFieldsMachine form={form} />;
      break;
    case "Procedure":
      formFields1 = <FormFieldsProcedure form={form} />;
      break;
    case "Product":
      formFields1 = <FormFieldsProduct form={form} />;
      break;
    case "Vendor":
      formFields1 = <FormFieldsVendor form={form} />;
      break;
    default:
      formFields1 = <div>erro</div>;
      break;
  }

  async function onSubmit(data: z.infer<typeof typeSchema>) {
    // Add as second argument of formatObject the enums that'll be treated to be send their indexes.
    const formattedData = formatObject(data, [Classification, Status]);
    setIsLoading(true);
    try {
      await axios.post(`/api/${apiCallByType}`, formattedData);
      setIsLoading(false);
      toast({
        title: "Registro",
        description: `${nameModal} foi criado com sucesso.`
      });
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: `Erro ao registrar - ${error.code}`,
        description: error.message
      });
    }
  }

  return (
    <>
      <DialogTrigger asChild>
        <Button variant="default">Criar {nameModal}</Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="min-w-full min-h-full">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Criando {nameModal}</DialogTitle>
              <div className="grid grid-cols-3 gap-4">{formFields1}</div>
            </DialogHeader>
            <DialogFooter className="absolute bottom-0 right-0 p-10">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isLoading ? true : false}>
                  Fechar
                </Button>
              </DialogClose>
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </Button>
              ) : (
                <Button type="submit">Criar</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </>
  );
};
