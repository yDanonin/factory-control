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
  formPaymentSchema
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
  paymentDefaultValues
} from "@/schemas/DefaultValuesForm";
import {
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FormFieldsProductReturn } from "../FormFieldsObjectsCreate/FormFieldsProductReturn";
import { ProductReturn, ProductReturnRegister } from "@/types/product_return.types";
import { MaterialOrder } from "@/types/material-order.types";
import { FormFieldsPayment } from "../FormFieldsObjectsCreate/FormFieldsPayment";
import { PaymentRegister } from "@/types/payment.types";

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
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDialogClose = () => {
    form.reset();
    setOpen(false);
    router.refresh();
  };

  let typeSchema:
    | z.ZodType<Partial<Customer> | z.ZodType<Partial<Employee>> | z.ZodType<Partial<Machine>>>
    | z.ZodType<Partial<Procedure>>
    | z.ZodType<Partial<Product>>
    | z.ZodType<Partial<Vendor>>
    | z.ZodType<Partial<Vacation>>
    | z.ZodType<Partial<Order>>
    | z.ZodType<Partial<MaterialOrder>>
    | z.ZodType<Partial<ProductReturnRegister>>
    | z.ZodType<Partial<PaymentRegister>>;

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
    default:
      formFields1 = <div>erro</div>;
      break;
  }
  FormFieldsPayment
  async function onSubmit(data: z.infer<typeof typeSchema>) {
    // Add as second argument of formatObject the enums that'll be treated to be send their indexes.
    const formattedData = formatObject(data, [Classification, Status]);
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
                <Button type="button" variant="secondary" disabled={ isLoading }  onClick={handleDialogClose}>
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
