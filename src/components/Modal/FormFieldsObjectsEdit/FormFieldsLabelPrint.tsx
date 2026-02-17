"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface FormFieldsLabelPrintProps {
  form: UseFormReturn;
}

export const FormFieldsLabelPrint: React.FC<FormFieldsLabelPrintProps> = ({ form }) => {
  return (
    <>
      <input type="hidden" {...form.register("order_id", { valueAsNumber: true })} />
    </>
  );
};
