import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Keeping form prop untyped to be reusable across contexts
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Status } from "@/types/common.types";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsPriceProps {
  form: UseFormReturn<any>;
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
            <FormLabelWithHelp label="ID do Produto" helpText={help.productId} />
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
            <FormLabelWithHelp label="ID do Cliente" helpText={help.customerId} optional />
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
            <FormLabelWithHelp label="Custo de Produção" helpText={help.productionCost} />
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
            <FormLabelWithHelp label="Margem Operacional (%)" helpText={help.operationalMargin} />
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
            <FormLabelWithHelp label="Preço Final" helpText={help.finalPrice} />
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
            <FormLabelWithHelp label="Preço Segunda Linha" helpText={help.secondLinePrice} optional />
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
            <FormLabelWithHelp label="Congelado até" helpText={help.frozenUntil} optional />
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
            <FormLabelWithHelp label="Status" helpText={help.status} />
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