"use client";

import React, { memo, useState } from "react";

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
import { FormFieldsVendor } from "../FormFieldsObjectsEdit/FormFieldsVendor";
import { FormFieldsProduct } from "../FormFieldsObjectsEdit/FormFieldsProduct";
import { FormFieldsMachine } from "../FormFieldsObjectsEdit/FormFieldsMachine";
import { FormFieldsEmployee } from "../FormFieldsObjectsEdit/FormFieldsEmployee";
import { FormFieldsCustomer } from "../FormFieldsObjectsEdit/FormFieldsCustomer";
import { FormFieldsProcedure } from "../FormFieldsObjectsEdit/FormFieldsProcedure";
import {
  formCustomerSchema,
  formEmployeeSchema,
  formMachineSchema,
  formProcedureSchema,
  formProductSchema,
  formVendorSchema
} from "@/schemas/FormSchemas";
import {
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface ModalEditProps {
  nameModal: string;
  typeRegister: string;
  rowData?:
    | Partial<Customer>
    | Partial<Employee>
    | Partial<Machine>
    | Partial<Procedure>
    | Partial<Product>
    | Partial<Vendor>;
  idRowData?: number;
}

function Edit({ nameModal, rowData, idRowData, typeRegister }: ModalEditProps) {
  // function dataCorrected(obj) {
  //   if (obj["address"]) {
  //     obj["address"]["address_number"] = obj["address"]["address_number"].toString();
  //   }
  //   for (const key in obj) {
  //     if (obj[key] === null) {
  //       obj[key] = "";
  //     }
  //     if (typeof obj[key] === "number") {
  //       obj[key] = obj[key].toString();
  //     }
  //     if (typeof obj[key] === "boolean" && obj[key] === true) {
  //       obj[key] = "true";
  //     }
  //     if (typeof obj[key] === "boolean" && obj[key] === false) {
  //       obj[key] = "false";
  //     }
  //     if ((key === "status" || key === "location_status") && obj[key] === "Operacional") {
  //       obj[key] = Status.operacional;
  //     }
  //     if ((key === "status" || key === "location_status") && obj[key] === "Suspenso") {
  //       obj[key] = Status.suspenso;
  //     }
  //     if (key === "classification" && obj[key] === "funcionario") {
  //       obj[key] = Classification.funcionario;
  //     }
  //     if (key === "classification" && obj[key] === "em teste") {
  //       obj[key] = Classification.em_teste;
  //     }
  //     if (key === "classification" && obj[key] === "externo") {
  //       obj[key] = Classification.externo;
  //     }
  //   }
  //   return obj;
  // }

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  let typeSchema:
    | z.ZodType<Partial<Customer> | z.ZodType<Partial<Employee>> | z.ZodType<Partial<Machine>>>
    | z.ZodType<Partial<Procedure>>
    | z.ZodType<Partial<Product>>
    | z.ZodType<Partial<Vendor>>;

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
    <>
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
                <Button type="button" variant="secondary" disabled={isLoading ? true : false}>
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
    </>
  );
}

export default memo(Edit);
