import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { formMessageConfigSchema } from "@/schemas/FormSchemas";

interface FormFieldsMessageConfigProps {
  form: UseFormReturn<z.infer<typeof formMessageConfigSchema>>;
}

export function FormFieldsMessageConfig({ form }: FormFieldsMessageConfigProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="customer_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID do Cliente</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="can_whatsapp"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Permitir WhatsApp</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="can_whatsapp_attachments"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Permitir Anexos no WhatsApp</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="can_telegram"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Permitir Telegram</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="can_telegram_attachments"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Permitir Anexos no Telegram</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="can_email"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Permitir Email</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="can_email_attachments"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Permitir Anexos no Email</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
} 