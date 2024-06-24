import { z } from "zod";
import { Status } from "@/types/common.types";
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
    credit_limit: z.number({ coerce: true }),
    debts: z.number({ coerce: true }),
    cpf: z.string(),
    cnpj: z.string(),
    deliver: z.string(),
    pontalti: z.string(),
    secondary_line: z.string(),
    status: z.nativeEnum(Status),
    address: z.object({
      zip_code: z
        .string()
        .min(2, {
          message: "Informe o CEP."
        })
        .refine((cep) => validaCep(cep), {
          message: "CEP Inválido."
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
      state: z.string().max(2, {
        message: "Informe a sigla do Estado."
      }),
      complement: z.string(),
      address_number: z.number({ coerce: true })
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
  salary: z.number({ coerce: true }),
  admission: z.date(),
  dismissal_date: z.date()
});

export const formMachineSchema = z.object({
  model: z.string(),
  machine_number: z.number(),
  location: z.string(),
  status: z.nativeEnum(Status),
  location_status: z.nativeEnum(Status)
});

export const formProcedureSchema = z.object({
  process_name: z.string(),
  workers: z.number(),
  status: z.nativeEnum(Status)
});

export const formProductSchema = z.object({
  name: z.string(),
  model: z.string(),
  size: z.string(),
  sales: z.number(),
  volume_sales: z.number(),
  invoicing: z.number({ coerce: true }),
  character: z.string(),
  moldes: z.number(),
  equivalency: z.number(),
  status: z.nativeEnum(Status)
});

export const formVendorSchema = z.object({
  name: z.string(),
  store_name: z.string(),
  cnpj: z.string(),
  cel_number: z.string(),
  phone: z.string(),
  deliver: z.string(),
  volume_purchases: z.number(),
  purchases: z.number({ coerce: true }),
  invoicing: z.number({ coerce: true }),
  status: z.nativeEnum(Status),
  address: z.object({
    zip_code: z
      .string()
      .min(2, {
        message: "Informe o CEP."
      })
      .refine((cep) => validaCep(cep), {
        message: "CEP Inválido."
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
    state: z.string().max(2, {
      message: "Informe a sigla do Estado."
    }),
    complement: z.string(),
    address_number: z.number({ coerce: true })
  })
});

export const signInFormSchema = z.object({
  email: z.string().email().min(1, {
    message: "Insira um email pontalti."
  }),
  password: z.string().min(1, {
    message: "Insira uma senha."
  })
});

function validaCep(cep: string) {
  return /^\d{8}$/.test(cep.replace(/[^\d]+/g, ""));
}
