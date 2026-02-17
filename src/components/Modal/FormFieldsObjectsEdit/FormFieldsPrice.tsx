import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formPriceSchema } from "@/schemas/FormSchemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Status } from "@/types/common.types";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsPriceProps {
  form: UseFormReturn<z.infer<typeof formPriceSchema>>;
}

const help = fieldHelpTexts.price;

export function FormFieldsPrice({ form }: FormFieldsPriceProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="product_id"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="product_id" label="ID do Produto" helpText={help.product_id} />
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="customer_id"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="customer_id" label="ID do Cliente (opcional)" helpText={help.customer_id} optional />
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="production_cost"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="production_cost" label="Custo de Produção" helpText={help.production_cost} />
            <FormControl>
              <Input type="number" step="0.01" placeholder="0.00" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="operational_margin"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="operational_margin" label="Margem Operacional (%)" helpText={help.operational_margin} />
            <FormControl>
              <Input type="number" step="0.01" placeholder="0.00" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="final_price"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="final_price" label="Preço Final" helpText={help.final_price} />
            <FormControl>
              <Input type="number" step="0.01" placeholder="0.00" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="second_line_price"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="second_line_price" label="Preço Segunda Linha (opcional)" helpText={help.second_line_price} optional />
            <FormControl>
              <Input type="number" step="0.01" placeholder="0.00" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="frozen_until"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="frozen_until" label="Congelado até (opcional)" helpText={help.frozen_until} optional />
            <FormControl>
              <Input
                type="date"
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
              />
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={Status.operacional}>Operacional</SelectItem>
                <SelectItem value={Status.suspenso}>Suspenso</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
