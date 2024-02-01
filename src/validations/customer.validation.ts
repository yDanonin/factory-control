import * as yup from "yup";

export const customerValidation = yup.object().shape({
  name: yup.string().required("Nome é requerido")
});
