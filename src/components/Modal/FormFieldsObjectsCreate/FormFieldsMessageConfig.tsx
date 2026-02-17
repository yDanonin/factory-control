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
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";
// Intentionally left generic to accept any form

interface FormFieldsMessageConfigProps {
  form: UseFormReturn<any>;
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
            <FormLabelWithHelp label="ID do Cliente" helpText={help.customerId} />
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
            <FormLabelWithHelp label="Permitir WhatsApp" helpText={help.canWhatsapp} />
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
            <FormLabelWithHelp label="Permitir Anexos no WhatsApp" helpText={help.canWhatsappAttachments} />
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
            <FormLabelWithHelp label="Permitir Telegram" helpText={help.canTelegram} />
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
            <FormLabelWithHelp label="Permitir Anexos no Telegram" helpText={help.canTelegramAttachments} />
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
            <FormLabelWithHelp label="Permitir Email" helpText={help.canEmail} />
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
            <FormLabelWithHelp label="Permitir Anexos no Email" helpText={help.canEmailAttachments} />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
} 