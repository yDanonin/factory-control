"use client";
import React from "react";
import Image from "next/image";

import { z } from "zod";
// import axios from "axios";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import LogoPontaltiPng from "../../../assets/images/logo_pontalti_default.png";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const signInFormSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/@\S*pontalti\S*/, { message: "Email inválido." })
    .min(1, {
      message: "Insira uma senha."
    }),
  password: z.string().min(1, {
    message: "Insira uma senha."
  })
});

const SignIn: React.FC = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    });
    console.log(res);

    // if (res.error) {
    //   // toast()... - implementar a notificação
    // }
  }

  return (
    <div className="max-w-screen min-h-screen flex items-center justify-center">
      <div className="w-1/4 flex flex-col gap-5 rounded border border-[#e2e8f0] p-7 shadow-md">
        <div className="w-full flex items-center justify-center">
          <Image src={LogoPontaltiPng} width={45} height={45} alt="Logo Pontalti" />
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Endereço de Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Logar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
