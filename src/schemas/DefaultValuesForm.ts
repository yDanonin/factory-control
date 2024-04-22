import { Classification } from "@/types/employee.types";

export const employeeDefaultValues = {
  name: "",
  phone: "",
  cel_number: "",
  cpf: "",
  classification: Classification.funcionario,
  salary: 0,
  admission: new Date(),
  dismissal_date: new Date()
};

export const customerDefaultValues = {
  name: "",
  phone: "",
  cel_number: "",
  email: "",
  store_name: "",
  credit_limit: 0,
  debts: 0,
  cpf: "",
  cnpj: "",
  deliver: false,
  pontalti: false,
  secondary_line: false,
  status: false,
  address: {
    zip_code: "",
    neighborhood: "",
    public_place: "",
    city: "",
    state: "",
    complement: "",
    address_number: 0
  }
};
