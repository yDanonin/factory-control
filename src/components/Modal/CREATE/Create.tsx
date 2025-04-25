"use client";

import React, { useState } from "react";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Form } from "@/components/ui/form";
import { Status } from "@/types/common.types";
import { Vendor } from "@/types/vendor.types";
import { Vacation } from "@/types/vacation.types";
import { Order } from "@/types/order.types";
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
import { FormFieldsVacation } from "../FormFieldsObjectsCreate/FormFieldsVacation";
import { FormFieldsProduct } from "../FormFieldsObjectsCreate/FormFieldsProduct";
import { FormFieldsMachine } from "../FormFieldsObjectsCreate/FormFieldsMachine";
import { FormFieldsEmployee } from "../FormFieldsObjectsCreate/FormFieldsEmployee";
import { FormFieldsCustomer } from "../FormFieldsObjectsCreate/FormFieldsCustomer";
import { FormFieldsProcedure } from "../FormFieldsObjectsCreate/FormFieldsProcedure";
import { FormFieldsOrder } from "../FormFieldsObjectsCreate/FormFieldsOrder";
import { FormFieldsMaterialOrder } from "../FormFieldsObjectsCreate/FormFieldsMaterialOrder";
import { FormFieldsProductReturn } from "../FormFieldsObjectsCreate/FormFieldsProductReturn";
import { FormFieldsPayment } from "../FormFieldsObjectsCreate/FormFieldsPayment";
import { FormFieldsUser } from "../FormFieldsObjectsCreate/FormFieldsUser";
import { User } from "@/types/user.types";
import { Price } from "@/types/price.types";
import { FormFieldsPrice } from "../FormFieldsObjectsCreate/FormFieldsPrice";
import {
  formCustomerSchema,
  formEmployeeSchema,
  formMachineSchema,
  formProcedureSchema,
  formProductSchema,
  formVendorSchema,
  formVacationSchema,
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
  customerDefaultValues,
  employeeDefaultValues,
  machineDefaultValues,
  procedureDefaultValues,
  productDefaultValues,
  vendorDefaultValues,
  vacationDefaultValues,
  orderDefaultValues,
  materialOrderDefaultValues,
  productReturnDefaultValues,
  paymentDefaultValues,
  userDefaultValues,
  priceDefaultValues,
  messageConfigDefaultValues,
  invoiceDefaultValues
} from "@/schemas/DefaultValuesForm";
import {
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { MaterialOrder } from "@/types/material-order.types";
import { ProductReturn, ProductReturnRegister } from "@/types/product_return.types";
import { PaymentRegister } from "@/types/payment.types";
import { FormFieldsMessageConfig } from "../FormFieldsObjectsCreate/FormFieldsMessageConfig";
import { FormFieldsInvoice } from "../FormFieldsObjectsCreate/FormFieldsInvoice";

interface ModalEditProps {
  nameModal: string;
  typeRegister: TypeRegister;
}

type TypeRegister = "Customer" | "Employee" | "Machine" | "Procedure" | "Product" | "Vendor" | "Vacation" | "Order" | "MaterialOrder" | "ProductReturn" | "Payment" | "User" | "Price" | "MessageConfig" | "Invoice";

type FormData = z.infer<typeof formCustomerSchema> |
  z.infer<typeof formEmployeeSchema> |
  z.infer<typeof formMachineSchema> |
  z.infer<typeof formProcedureSchema> |
  z.infer<typeof formProductSchema> |
  z.infer<typeof formVendorSchema> |
  z.infer<typeof formVacationSchema> |
  z.infer<typeof formOrderSchema> |
  z.infer<typeof formMaterialOrderSchema> |
  z.infer<typeof formProductReturnSchema> |
  z.infer<typeof formPaymentSchema> |
  z.infer<typeof formUserSchema> |
  z.infer<typeof formPriceSchema> |
  z.infer<typeof formMessageConfigSchema> |
  z.infer<typeof formInvoiceSchema>;

export const Create: React.FC<ModalEditProps> = ({ nameModal, typeRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDialogClose = () => {
    form.reset();
    setOpen(false);
    router.refresh();
  };

  let typeSchema: z.ZodType<FormData>;
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
    case "Vacation":
      typeSchema = formVacationSchema;
      objDefaultValues = vacationDefaultValues;
      apiCallByType = "employees/vacations";
      break;
    case "Order":
      typeSchema = formOrderSchema;
      objDefaultValues = orderDefaultValues;
      apiCallByType = "orders";
      break;
    case "MaterialOrder":
      typeSchema = formMaterialOrderSchema;
      objDefaultValues = materialOrderDefaultValues;
      apiCallByType = "material-orders";
      break;
    case "ProductReturn":
      typeSchema = formProductReturnSchema;
      objDefaultValues = productReturnDefaultValues;
      apiCallByType = "product-returns";
      break;
    case "Payment":
      typeSchema = formPaymentSchema;
      objDefaultValues = paymentDefaultValues;
      apiCallByType = "payments";
      break;
    case "User":
      typeSchema = formUserSchema;
      objDefaultValues = userDefaultValues;
      apiCallByType = "users";
      break;
    case "Price":
      typeSchema = formPriceSchema;
      objDefaultValues = priceDefaultValues;
      apiCallByType = "prices";
      break;
    case "MessageConfig":
      typeSchema = formMessageConfigSchema;
      objDefaultValues = messageConfigDefaultValues;
      apiCallByType = "messages/config";
      break;
    case "Invoice":
      typeSchema = formInvoiceSchema;
      objDefaultValues = invoiceDefaultValues;
      apiCallByType = "invoices";
      break;
    default:
      throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  const form = useForm<FormData>({
    resolver: zodResolver(typeSchema),
    defaultValues: objDefaultValues as any,
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
    case "Vacation":
      formFields1 = <FormFieldsVacation form={form} />;
      break;
    case "Order":
      formFields1 = <FormFieldsOrder form={form} />;
      break;
    case "MaterialOrder":
      formFields1 = <FormFieldsMaterialOrder form={form} />;
      break;
    case "ProductReturn":
      formFields1 = <FormFieldsProductReturn form={form} />;
      break;
    case "Payment":
      formFields1 = <FormFieldsPayment form={form} />;
      break;
    case "User":
      formFields1 = <FormFieldsUser form={form} />;
      break;
    case "Price":
      formFields1 = <FormFieldsPrice form={form} />;
      break;
    case "MessageConfig":
      formFields1 = <FormFieldsMessageConfig form={form} />;
      break;
    case "Invoice":
      formFields1 = <FormFieldsInvoice form={form} />;
      break;
    default:
      formFields1 = <div>erro</div>;
      break;
  }

  async function onSubmit(data: FormData) {
    const formattedData = formatObject(data as any, [Classification, Status]);
    setIsLoading(true);
    try {
      await axios.post(`/api/${apiCallByType}`, formattedData);
      setIsLoading(false);
      form.reset();
      router.refresh();
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
              <div className="pt-4 grid grid-cols-3 gap-4">{formFields1}</div>
            </DialogHeader>
            <DialogFooter className="absolute bottom-0 right-0 p-10">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isLoading} onClick={handleDialogClose}>
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
