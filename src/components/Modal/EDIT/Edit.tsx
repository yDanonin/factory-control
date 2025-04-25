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
  formOrderSchema,
  formMaterialOrderSchema,
  formProductReturnSchema,
  formPaymentSchema,
  formUserSchema,
  formPriceSchema,
  formMessageConfigSchema,
  formInvoiceSchema
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
import { FormFieldsMaterialOrder } from "../FormFieldsObjectsEdit/FormFieldsMaterialOrder";
import { FormFieldsProductReturn } from "../FormFieldsObjectsEdit/FormFieldsProductReturn";
import { MaterialOrder } from "@/types/material-order.types";
import { ProductReturn } from "@/types/product_return.types";
import { PaymentRegister } from "@/types/payment.types";
import { FormFieldsPayment } from "../FormFieldsObjectsEdit/FormFieldsPayment";
import { FormFieldsPrice } from "../FormFieldsObjectsEdit/FormFieldsPrice";
import { User } from "@/types/user.types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Price } from "@/types/price.types";
import { MessageConfig } from "@/types/message.types";
import { FormFieldsMessageConfig } from "../FormFieldsObjectsEdit/FormFieldsMessageConfig";
import { FormFieldsInvoice } from "../FormFieldsObjectsEdit/FormFieldsInvoice";
import { invoiceDefaultValues } from "@/schemas/DefaultValuesForm";

interface ModalEditProps {
  nameModal: string;
  typeRegister: TypeRegister;
  rowData?:
    | Partial<Customer>
    | Partial<Employee>
    | Partial<Machine>
    | Partial<Procedure>
    | Partial<Product>
    | Partial<Vendor>
    | Partial<Vacation>
    | Partial<TimeConfiguration>
    | Partial<Order>
    | Partial<MaterialOrder>
    | Partial<ProductReturn>
    | Partial<PaymentRegister>
    | Partial<User>
    | Partial<Price>
    | Partial<MessageConfig>;
  idRowData?: number | string;
}

type TypeRegister = "Customer" | "Employee" | "Machine" | "Procedure" | "Product" | "Vendor" | "Vacation" | "TimeConfiguration" | "Order" | "MaterialOrder" | "ProductReturn" | "Payment" | "User" | "Price" | "MessageConfig" | "Invoice";

export const Edit = ({ nameModal, rowData, idRowData, typeRegister }: ModalEditProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
    setOpen(isOpen);
  };

  let typeSchema;
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
    case "MaterialOrder":
      typeSchema = formMaterialOrderSchema;
      apiCallByType = "material-orders";
      break;
    case "ProductReturn":
      typeSchema = formProductReturnSchema;
      apiCallByType = "product-returns";
      break;
    case "Payment":
      typeSchema = formPaymentSchema;
      apiCallByType = "payments";
      break;
    case "User":
      typeSchema = formUserSchema;
      apiCallByType = "users";
      break;
    case "Price":
      typeSchema = formPriceSchema;
      apiCallByType = "prices";
      break;
    case "MessageConfig":
      typeSchema = formMessageConfigSchema;
      apiCallByType = "messages/config";
      break;
    case "Invoice":
      typeSchema = formInvoiceSchema;
      apiCallByType = "invoices";
      break;
    default:
      throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  const getFormDefaults = () => {
    const defaults = { ...rowData } as any;
    
    switch (typeRegister) {
      case "Order":
      case "ProductReturn":
        return {
          ...defaults,
          order_id: defaults?.order?.id,
          date: defaults?.date ? new Date(defaults.date) : new Date()
        };
      case "Payment":
        return {
          ...defaults,
          date: defaults?.date ? new Date(defaults.date) : new Date()
        };
      case "Price":
        return {
          product_id: defaults?.product_id || 0,
          customer_id: defaults?.customer_id,
          production_cost: defaults?.production_cost || 0,
          operational_margin: defaults?.operational_margin || 0,
          final_price: defaults?.final_price || 0,
          second_line_price: defaults?.second_line_price,
          frozen_until: defaults?.frozen_until ? new Date(defaults.frozen_until) : undefined,
          status: defaults?.status || Status.operacional
        };
      case "Invoice":
        return {
          ...defaults,
          order_id: defaults?.order_id || '',
          number: defaults?.number || '',
          status: defaults?.status || '',
          type: defaults?.type || '',
          issue_date: defaults?.issue_date || '',
          recipient: defaults?.recipient || '',
          note: defaults?.note || ''
        };
      default:
        return defaults;
    }
  };

  const form = useForm({
    resolver: zodResolver(typeSchema),
    defaultValues: getFormDefaults()
  });

  switch (typeRegister) {
    case "Customer":
      formFields = <FormFieldsCustomer form={form} rowData={rowData as Partial<Customer>} />;
      break;
    case "Employee":
      formFields = <FormFieldsEmployee form={form} rowData={rowData as Partial<Employee>} />;
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
      formFields = <FormFieldsVendor form={form} rowData={rowData as Partial<Vendor>} />;
      break;
    case "Vacation":
      formFields = <FormFieldsVacation form={form} />;
      break;
    case "TimeConfiguration":
      formFields = <FormFieldsTimeConfiguration form={form} />;
      break;
    case "Order":
      formFields = <FormFieldsOrder form={form} />;
      break;
    case "MaterialOrder":
      formFields = <FormFieldsMaterialOrder form={form} />;
      break;
    case "ProductReturn":
      formFields = <FormFieldsProductReturn form={form} />;
      break;
    case "Payment":
      formFields = <FormFieldsPayment form={form} />;
      break;
    case "User":
      formFields = (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              {...form.register("name")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              {...form.register("email")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              {...form.register("password")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isAdmin" className="text-right">
              Admin
            </Label>
            <div className="col-span-3">
              <Checkbox
                id="isAdmin"
                {...form.register("isAdmin")}
              />
            </div>
          </div>
        </div>
      );
      break;
    case "Price":
      formFields = <FormFieldsPrice form={form} />;
      break;
    case "MessageConfig":
      formFields = <FormFieldsMessageConfig form={form} />;
      break;
    case "Invoice":
      formFields = <FormFieldsInvoice form={form} />;
      break;
    default:
      formFields = <div>erro</div>;
      break;
  }

  async function onSubmit(data: any) {
    const formattedData = { id: idRowData, ...formatObject(data, [Classification, Status]) };
    setIsLoading(true);
    try {
      await axios.patch(`/api/${apiCallByType}/${idRowData}`, formattedData);
      setIsLoading(false);
      form.reset();
      router.refresh();
      toast({
        title: "Registro",
        description: `${nameModal} foi editado com sucesso.`
      });
      setOpen(false);
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

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger>Editar {nameModal}</DialogTrigger>
      <Form {...form}>
        <DialogContent className="min-w-full min-h-full">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Editando {nameModal}</DialogTitle>
            </DialogHeader>
            <div className="pt-4 grid grid-cols-3 gap-4">{formFields}</div>
            <DialogFooter className="absolute bottom-0 right-0 p-10">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isLoading}>
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
};

// export default Edit;
