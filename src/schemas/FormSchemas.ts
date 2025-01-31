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
    }).optional(),
    cel_number: z.string().min(11, {
      message: "Informe o número de celular."
    }),
    email: z.string().email({ message: "Informe o email."}),
    store_name: z.string().min(2, {
      message: "Informe o nome da loja."
    }),
    credit_limit: z.number({ coerce: true }).positive({
      message: "Informe o limite de crédito."
    }),
    debts: z.number({ coerce: true }).positive({
      message: "Informe o débito."
    }),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    deliver: z.string({ message: "Informe se é entrega ou retirada." }),
    pontalti: z.string({ message: "Informe se é da Pontalti." }),
    secondary_line: z.string({ message: "Informe se é linha secundária." }),
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
      city: z.string().min(2, {
        message: "Informe a cidade."
      }),
      state: z.string()
      .min(2, { message: "Informe a sigla do Estado." })
      .max(2, { message: "Informe a sigla do Estado." }),
      complement: z.string().optional(),
      address_number: z.number({ coerce: true }).min(1, {
        message: "Informe o número do endereço."
      })
    })
  })
  .partial()
  .superRefine((data, ctx) => {
    if(!data.cpf && !data.cnpj) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF ou CNPJ devem ser inseridos",
        path: ["cpf"]
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF ou CNPJ devem ser inseridos",
        path: ["cnpj"]
      })
    }
  });

export const formEmployeeSchema = z.object({
  name: z.string().min(2, {
    message: "Informe o nome."
  }),
  phone: z.string().min(11, {
    message: "Informe o número de telefone."
  }).optional(),
  cel_number: z.string().min(11, {
    message: "Informe o número de celular."
  }),
  cpf: z.string().min(11, {
    message: "Informe o CPF."
  }),
  classification: z.nativeEnum(Classification),
  salary: z.number({ coerce: true }).optional(),
  admission: z.date({ required_error: "Informe a data de admissão." }),
  dismissal_date: z.date().optional()
});

export const formMachineSchema = z.object({
  model: z.string().min(2, {
    message: "Informe o modelo."
  }),
  machine_number: z.number({ coerce: true, invalid_type_error: "Informe o número da máquina." }),
  location: z.string().min(1, {
    message: "Informe a localização."
  }),
  status: z.nativeEnum(Status),
  location_status: z.nativeEnum(Status)
});

export const formProcedureSchema = z.object({
  process_name: z.string().min(2, {
    message: "Informe o nome do processo."
  }),
  workers: z.number({ coerce: true, invalid_type_error: "Informe o número de trabalhadores." }),
  status: z.nativeEnum(Status)
});

export const formProductSchema = z.object({
  name: z.string().min(2, {
    message: "Informe o nome."
  }),
  model: z.string().min(1, {
    message: "Informe o modelo."
  }),
  size: z.string().min(1, {
    message: "Informe o tamanho."
  }),
  sales: z.number({ coerce: true, invalid_type_error: "Informe o número de vendas." }),
  volume_sales: z.number({ coerce: true, invalid_type_error: "Informe o volume de vendas." }),
  invoicing: z.number({ coerce: true }).positive({
    message: "Informe o valor das compras."
  }),
  character: z.string(),
  moldes: z.number({ coerce: true, invalid_type_error: "Informe os moldes." }),
  equivalency: z.number({ coerce: true, invalid_type_error: "Informe a equivalência." }),
  status: z.nativeEnum(Status)
});

export const formVendorSchema = z.object({
  name: z.string().min(2, {
    message: "Informe o nome."
  }),
  store_name: z.string().min(2, {
    message: "Informe o nome da loja."
  }),
  cnpj: z.string().min(14, {
    message: "Informe o CNPJ."
  }),
  cel_number: z.string().min(11, {
    message: "Informe o número de celular."
  }),
  phone: z.string().min(11, {
    message: "Informe o número de telefone."
  }).optional(),
  deliver: z.string(),
  volume_purchases: z.number({ coerce: true, invalid_type_error: "Informe o volume de compras." }),
  purchases: z.number({ coerce: true }).positive({
    message: "Informe o valor das compras."
  }),
  invoicing: z.number({ coerce: true }).positive({
    message: "Informe o faturamento."
  }),
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
    city: z.string().min(2, {
      message: "Informe a cidade."
    }),
    state: z.string()
    .min(2, { message: "Informe a sigla do Estado." })
    .max(2, { message: "Informe a sigla do Estado." }),
    complement: z.string().optional(),
    address_number: z.number({ coerce: true }).min(1, {
      message: "Informe o número do endereço."
    })
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

export const formVacationSchema = z.object({
  employee_id: z.number({ coerce: true }).positive({
    message: "Informe o ID do funcionário."
  }),
  start_date: z.date({ required_error: "Informe a data de início." }),
  end_date: z.date({ required_error: "Informe a data de término." }),
  sold_days: z.number({ coerce: true }).positive({
    message: "Informe a quantidade de dias vendidos."
  }),
});

export const formTimeConfigurationSchema = z.object({
  work_start: z.string(),
  work_end: z.string(),
  late_limit_in_minutes: z.number({ coerce: true })
});

export const formOrderSchema = z.object({
  final_price: z.number({ coerce: true }).positive({
    message: "Informe o faturamento."
  }),
  date: z.date({ required_error: "Informe a data." }),
  customer_id: z.number({ coerce: true }).positive({
    message: "Informe o Id do cliente."
  }),
  products: z
    .array(
      z.object({
        product_id: z.number({ coerce: true }),
        quantity: z.number({ coerce: true }),
      })
    )
    .nonempty({ message: "Adicione ao menos um produto." }),
});

export const formMaterialOrderSchema = z.object({
  date: z.date(),
  amount: z.number({ coerce: true }),
  unit: z.string(),
  storage_location: z.string(),
  received_by: z.string(),
  product_id: z.number({ coerce: true }),
  vendor_id: z.number({ coerce: true }),
});

export const formProductReturnSchema = z.object({
  product_return: z.object({
    date: z.date(),
    replacement_necessary: z.string(),
    resold:  z.string(),
    return_reason:  z.string(),
    order_id: z.number(),
  }),
  returned_labels: z.array(
    z.object({
      ticket_code: z.string(),
      opened: z.string(),
      quantity: z.number({ coerce: true }),
    })
  )
  .nonempty({ message: "Adicione ao menos um produto." }),
});

export const formPaymentSchema = z.object({
  amount_paid: z.number({ coerce: true, invalid_type_error: "Informe o valor do total pago." }).positive({
    message: "Informe o valor do total pago."
  }),
  payment_method: z.string().min(1, {
    message: "Informe o método de pagamento."
  }),
  date: z.date({ required_error: "Informe a data." }),
  order_id: z.number({ coerce: true, invalid_type_error: "Informe o ID do pedido." }).positive({
    message: "Informe o Id do pedido."
  }),
});

function validaCep(cep: string) {
  return /^\d{8}$/.test(cep.replace(/[^\d]+/g, ""));
}
