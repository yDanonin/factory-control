"use client";

import React, { memo, useState, useEffect } from "react";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Form } from "@/components/ui/form";
import { Status } from "@/types/common.types";
import { Vendor } from "@/types/vendor.types";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.types";
import { Machine } from "@/types/machine.types";
import { Customer } from "@/types/customer.types";
import { Procedure } from "@/types/procedure.types";
import { Vacation } from "@/types/vacation.types";
import { Order } from "@/types/order.types";
import { TimeConfiguration } from "@/types/time-configuration.types";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatObject } from "@/services/formatInputs";
import { Classification, Employee } from "@/types/employee.types";
import { FormFieldsVendor } from "../FormFieldsObjectsEdit/FormFieldsVendor";
import { FormFieldsVacation } from "../FormFieldsObjectsEdit/FormFieldsVacation";
import { FormFieldsTimeConfiguration } from "../FormFieldsObjectsEdit/FormFieldsTimeConfiguration";
import { FormFieldsProduct } from "../FormFieldsObjectsEdit/FormFieldsProduct";
import { FormFieldsMachine } from "../FormFieldsObjectsEdit/FormFieldsMachine";
import { FormFieldsEmployee } from "../FormFieldsObjectsEdit/FormFieldsEmployee";
import { FormFieldsCustomer } from "../FormFieldsObjectsEdit/FormFieldsCustomer";
import { FormFieldsProcedure } from "../FormFieldsObjectsEdit/FormFieldsProcedure";
import { FormFieldsOrder } from "../FormFieldsObjectsEdit/FormFieldsOrder";
import {
  formCustomerSchema,
  formEmployeeSchema,
  formMachineSchema,
  formProcedureSchema,
  formProductSchema,
  formVendorSchema,
  formVacationSchema,
  formTimeConfigurationSchema,
  formOrderSchema
} from "@/schemas/FormSchemas";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface ModalEditProps {
  nameModal: string;
  typeRegister: string;
  rowData?:
    | Partial<Customer>
    | Partial<Employee>
    | Partial<Machine>
    | Partial<Procedure>
    | Partial<Product>
    | Partial<Vendor>
    | Partial<Vacation>
    | Partial<TimeConfiguration>
    | Partial<Order>;
  idRowData?: number;
}

export const Edit = ({ nameModal, rowData, idRowData, typeRegister }: ModalEditProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
    setOpen(isOpen);
  };

  let typeSchema:
    | z.ZodType<Partial<Customer> | z.ZodType<Partial<Employee>> | z.ZodType<Partial<Machine>>>
    | z.ZodType<Partial<Procedure>>
    | z.ZodType<Partial<Product>>
    | z.ZodType<Partial<Vendor>>
    | z.ZodType<Partial<Vacation>>
    | z.ZodType<Partial<TimeConfiguration>>
    | z.ZodType<Partial<Order>>;

  let apiCallByType: string;
  let formFields;

  switch (typeRegister) {
    case "Customer":
      typeSchema = formCustomerSchema;
      apiCallByType = "customers";
      break;
    case "Employee":
      typeSchema = formEmployeeSchema;
      apiCallByType = "employees";
      break;
    case "Machine":
      typeSchema = formMachineSchema;
      apiCallByType = "machines";
      break;
    case "Procedure":
      typeSchema = formProcedureSchema;
      apiCallByType = "procedures";
      break;
    case "Product":
      typeSchema = formProductSchema;
      apiCallByType = "products";
      break;
    case "Vendor":
      typeSchema = formVendorSchema;
      apiCallByType = "vendors";
      break;
    case "Vacation":
      typeSchema = formVacationSchema;
      apiCallByType = "employees/vacations";
      break;
    case "TimeConfiguration":
      typeSchema = formTimeConfigurationSchema;
      apiCallByType = "time-configurations";
      break;
    case "Order":
      typeSchema = formOrderSchema;
      apiCallByType = "orders";
      break;
    default:
      throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: rowData,
    disabled: isLoading
  });

  switch (typeRegister) {
    case "Customer":
      formFields = <FormFieldsCustomer form={form} rowData={rowData} />;
      break;
    case "Employee":
      formFields = <FormFieldsEmployee form={form} rowData={rowData} />;
      break;
    case "Machine":
      formFields = <FormFieldsMachine form={form} />;
      break;
    case "Procedure":
      formFields = <FormFieldsProcedure form={form} />;
      break;
    case "Product":
      formFields = <FormFieldsProduct form={form} />;
      break;
    case "Vendor":
      formFields = <FormFieldsVendor form={form} rowData={rowData} />;
      break;
    case "Vacation":
      formFields = <FormFieldsVacation form={form}/>;
      break;
    case "TimeConfiguration":
      formFields = <FormFieldsTimeConfiguration form={form} />
      break;
    case "Order":
      formFields = <FormFieldsOrder form={form} />
      break;
    default:
      formFields = <div>erro</div>;
      break;
  }

  async function onSubmit(data: z.infer<typeof typeSchema>) {
    // Add as second argument of formatObject the enums that'll be treated to be send their indexes.
    const formattedData = { id: idRowData, ...formatObject(data, [Classification, Status]) };
    setIsLoading(true);
    try {
      console.log("formated data", formattedData);
      await axios.patch(`/api/${apiCallByType}/${idRowData}`, formattedData);
      setIsLoading(false);
      form.reset();
      router.refresh();
      toast({
        title: "Registro",
        description: `${nameModal} foi editado com sucesso.`
      });
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: `Erro ao editar - ${error.code}`,
        description: error.message
      });
    }
  }

  console.log(isLoading);

  return (
    <Dialog  open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger>Editar {nameModal}</DialogTrigger>
      <Form {...form}>
        <DialogContent className="min-w-full min-h-full">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Editando {nameModal}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4">{formFields}</div>
            <DialogFooter className="absolute bottom-0 right-0 p-10">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={ isLoading }>
                  Fechar
                </Button>
              </DialogClose>
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Editando...
                </Button>
              ) : (
                <Button type="submit">Editar</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

// export default Edit;
