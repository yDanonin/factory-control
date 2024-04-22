import { z } from "zod";
import { Classification } from "@/types/employee.types";

export const formCustomerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Informe o nome."
    }),
    phone: z.string().min(11, {
      message: "Informe o número de telefone."
    }),
    cel_number: z.string().min(11, {
      message: "Informe o número de celular."
    }),
    email: z.string().email().min(2, {
      message: "Informe o email."
    }),
    store_name: z.string().min(2, {
      message: "Informe o nome da loja."
    }),
    credit_limit: z.number(),
    debts: z.number(),
    cpf: z.string(),
    cnpj: z.string(),
    deliver: z.string(),
    pontalti: z.string(),
    secondary_line: z.string(),
    status: z.enum(["suspenso", "operacional"]),
    address: z.object({
      zip_code: z.string().min(2, {
        message: "Informe o CEP."
      }),
      neighborhood: z.string().min(2, {
        message: "Informe o bairro."
      }),
      public_place: z.string().min(2, {
        message: "Informe a rua/avenida."
      }),
      city: z.string().min(8, {
        message: "Informe a cidade."
      }),
      state: z.string().min(8, {
        message: "Informe o Estado."
      }),
      complement: z.string(),
      address_number: z.number()
    })
  })
  .partial()
  .refine((data) => !!data.cpf || !!data.cnpj, {
    message: "Cpf ou Cnpj devem ser inseridos",
    path: ["cpf"]
  });

export const formEmployeeSchema = z.object({
  name: z.string().min(2, {
    message: "Informe o nome."
  }),
  phone: z.string().min(11, {
    message: "Informe o número de telefone."
  }),
  cel_number: z.string().min(11, {
    message: "Informe o número de celular."
  }),
  cpf: z.string(),
  classification: z.nativeEnum(Classification),
  salary: z.number(),
  admission: z.date(),
  dismissal_date: z.date()
});
