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

interface FormFieldsPriceProps {
  form: UseFormReturn<any>;
}

export function FormFieldsPrice({ form }: FormFieldsPriceProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="product_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID do Produto</FormLabel>
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
            <FormLabel>ID do Cliente (opcional)</FormLabel>
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
            <FormLabel>Custo de Produção</FormLabel>
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
            <FormLabel>Margem Operacional (%)</FormLabel>
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
            <FormLabel>Preço Final</FormLabel>
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
            <FormLabel>Preço Segunda Linha (opcional)</FormLabel>
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
            <FormLabel>Congelado até (opcional)</FormLabel>
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
            <FormLabel>Status</FormLabel>
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