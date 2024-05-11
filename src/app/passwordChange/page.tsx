"use client";
import React from "react";

import { z } from "zod";
// import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const passwordChangeformSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Mínimo de 8 caracteres."
      })
      .regex(/^(?=.*[a-zA-Z])/, {
        message: "Deve possuir pelo menos uma letra maiúscula ou minúscula"
      }),
    confirm_password: z.string()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não combinam",
    path: ["confirm_password"]
  });

const PasswordChange: React.FC = () => {
  const form = useForm<z.infer<typeof passwordChangeformSchema>>({
    resolver: zodResolver(passwordChangeformSchema),
    defaultValues: {
      password: "",
      confirm_password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof passwordChangeformSchema>) {
    console.log(values);
    // aaa
  }

  return (
    <div className="max-w-screen min-h-screen flex items-center justify-center">
      <div className="w-1/4 flex flex-col gap-5 rounded border border-[#e2e8f0] p-7 shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="font-semibold">Confirme a sua Senha</FormLabel>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Trocar senha
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasswordChange;
