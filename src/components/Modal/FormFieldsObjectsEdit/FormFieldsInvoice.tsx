import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { formInvoiceSchema } from "@/schemas/FormSchemas";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

type InvoiceFormType = z.infer<typeof formInvoiceSchema>;

interface Props {
  form: UseFormReturn<InvoiceFormType>;
}

const help = fieldHelpTexts.invoice;

export const FormFieldsInvoice: React.FC<Props> = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="order_id"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="order_id" label="ID do Pedido" helpText={help.order_id} />
          <Input type="number" {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="number"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="number" label="Número da Nota Fiscal" helpText={help.number} />
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="status" label="Status" helpText={help.status} />
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="type" label="Tipo" helpText={help.type} />
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="issue_date"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="issue_date" label="Data de Emissão" helpText={help.issue_date} />
          <Input type="datetime-local" {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="recipient"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="recipient" label="Destinatário" helpText={help.recipient} />
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="note"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="note" label="Observação" helpText={help.note} optional />
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
