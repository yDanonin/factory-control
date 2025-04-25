import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { formInvoiceSchema } from "@/schemas/FormSchemas";

type InvoiceFormType = z.infer<typeof formInvoiceSchema>;

interface Props {
  form: UseFormReturn<InvoiceFormType>;
}

export const FormFieldsInvoice: React.FC<Props> = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="order_id"
      render={({ field }) => (
        <FormItem>
          <Label htmlFor="order_id">ID do Pedido</Label>
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
          <Label htmlFor="number">Número da Nota Fiscal</Label>
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
          <Label htmlFor="status">Status</Label>
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
          <Label htmlFor="type">Tipo</Label>
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
          <Label htmlFor="issue_date">Data de Emissão</Label>
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
          <Label htmlFor="recipient">Destinatário</Label>
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
          <Label htmlFor="note">Observação</Label>
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  </>
); 