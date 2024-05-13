"use client";
import React, { useTransition } from "react";
import Image from "next/image";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { login } from "../../../../actions/login";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { signInFormSchema } from "@/schemas/FormSchemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Login: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function handleSubmit(values: z.infer<typeof signInFormSchema>) {
    startTransition(() => {
      login(values);
    });
  }

  return (
    <div className="max-w-screen bg-white min-h-screen flex items-center justify-center">
      <div className="w-1/4 flex flex-col gap-5 rounded border border-[#e2e8f0] p-7 shadow-md">
        <div className="w-full flex items-center justify-center">
          <Image src="/images/logo_pontalti_default.png" width={45} height={45} alt="Logo Pontalti" />
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Endereço de Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="font-semibold">Senha</FormLabel>
                    <Button type="button" className="p-0 h-0 font-semibold" variant="link">
                      Esqueceu a Senha?
                    </Button>
                  </div>
                  <FormControl>
                    <Input disabled={isPending} type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isPending}>
              Logar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
