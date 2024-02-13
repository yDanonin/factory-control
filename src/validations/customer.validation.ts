import * as yup from "yup";

export const Step_1_Schema = yup.object().shape({
  name: yup.string().required("Nome é requerido"),
  document: yup.number().typeError("Somente números").required("Documento é requerido"),
  status: yup.number().typeError("Somente números").required("Status é requerido"),
  cel_number: yup.number().typeError("Somente números").required("Celular é requerido"),
  phone: yup.number().typeError("Somente números").required("Telefone é requerido"),
  email: yup.string().email("Precisa ser um email valido").required("Email é requerido")
});

export const Step_2_Schema = yup.object().shape({
  zip_code: yup.number().typeError("Somente números").required("CEP é requerido"),
  neighborhood: yup.string().required("Bairro é requerido"),
  public_place: yup.string().required("Logradouro é requerido"),
  city: yup.string().required("Cidade é requerida"),
  state: yup.string().required("Estado é requerido"),
  address_number: yup.number().typeError("Somente números").required("Numero é requerido"),
  complement: yup.string()
});

export const Step_3_Schema = yup.object().shape({
  store_name: yup.string().required("Nome da loja é requerido"),
  credit_limit: yup.number().typeError("Somente números").required("Limite de Crédito é requerido"),
  deliver: yup.number().typeError("Somente números").required("Entrega/Retirada é requerido")
});
