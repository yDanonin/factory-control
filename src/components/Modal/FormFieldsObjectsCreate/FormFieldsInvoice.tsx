import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage, FormControl } from "@/components/ui/form";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";
// Keep form generic to avoid tight coupling in modal context
interface Props {
  form: UseFormReturn<any>;
}

const help = fieldHelpTexts.invoice;

export const FormFieldsInvoice: React.FC<Props> = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="order_id"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="order_id" label="ID do Pedido" helpText={help.orderId} />
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
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
          <FormControl>
            <Input {...field} />
          </FormControl>
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
          <FormControl>
            <Input {...field} />
          </FormControl>
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
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="issue_date"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithHelp htmlFor="issue_date" label="Data de Emissão" helpText={help.issueDate} />
          <FormControl>
            <Input type="datetime-local" {...field} />
          </FormControl>
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
          <FormControl>
            <Input {...field} />
          </FormControl>
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
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
); 