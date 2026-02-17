import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { formMessageConfigSchema } from "@/schemas/FormSchemas";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsMessageConfigProps {
  form: UseFormReturn<z.infer<typeof formMessageConfigSchema>>;
}

const help = fieldHelpTexts.messageConfig;

export function FormFieldsMessageConfig({ form }: FormFieldsMessageConfigProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="customer_id"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="customer_id" label="ID do Cliente" helpText={help.customer_id} />
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
            <FormLabelWithHelp htmlFor="can_whatsapp" label="Permitir WhatsApp" helpText={help.can_whatsapp} />
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
            <FormLabelWithHelp htmlFor="can_whatsapp_attachments" label="Permitir Anexos no WhatsApp" helpText={help.can_whatsapp_attachments} />
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
            <FormLabelWithHelp htmlFor="can_telegram" label="Permitir Telegram" helpText={help.can_telegram} />
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
            <FormLabelWithHelp htmlFor="can_telegram_attachments" label="Permitir Anexos no Telegram" helpText={help.can_telegram_attachments} />
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
            <FormLabelWithHelp htmlFor="can_email" label="Permitir Email" helpText={help.can_email} />
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
            <FormLabelWithHelp htmlFor="can_email_attachments" label="Permitir Anexos no Email" helpText={help.can_email_attachments} />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
