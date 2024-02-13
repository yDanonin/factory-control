import * as yup from "yup";

export const Step_1_Schema = yup.object().shape({
  name: yup.string().required("Nome é requerido"),
  document: yup.number().required("Documento é requerido"),
  status: yup.number().required("Status é requerido"),
  cel_number: yup.number().required("Celular é requerido"),
  phone: yup.number().required("Telefone é requerido"),
  email: yup.string().email("Precisa ser um email valido").required("Email é requerido")
});

export const Step_2_Schema = yup.object().shape({
  zip_code: yup.number().required("CEP é requerido"),
  neighborhood: yup.string().required("Bairro é requerido"),
  public_place: yup.string().required("Logradouro é requerido"),
  city: yup.string().required("Cidade é requerida"),
  state: yup.string().required("Estado é requerido"),
  address_number: yup.number().required("Numero é requerido"),
  complement: yup.string()
});

export const Step_3_Schema = yup.object().shape({
  store_name: yup.string().required("Nome da loja é requerido"),
  credit_limit: yup.number().required("Limite de Crédito é requerido"),
  deliver: yup.number().required("Entrega/Retirada é requerido")
});
