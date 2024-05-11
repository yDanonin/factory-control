"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signInFormSchema } from "@/schemas/FormSchemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof signInFormSchema>) => {
  const validateFields = signInFormSchema.safeParse(values);
  const { email, password } = validateFields.data;
  if (!validateFields) {
    return { error: "Invalid fields " };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas." };
        default:
          return { error: "Alguma coisa aconteceu de errado." };
      }
    }

    throw err;
  }
};
