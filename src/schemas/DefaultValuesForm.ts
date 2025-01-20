import { Status } from "@/types/common.types";
import { Classification } from "@/types/employee.types";

export const employeeDefaultValues = {
  name: "",
  phone: undefined,
  cel_number: "",
  cpf: "",
  classification: Classification.funcionario,
  salary: undefined,
  admission: new Date(),
  dismissal_date: undefined
};

export const customerDefaultValues = {
  name: "",
  phone: "",
  cel_number: "",
  email: "",
  store_name: "",
  credit_limit: "0",
  debts: "0",
  cpf: "",
  cnpj: "",
  deliver: false,
  pontalti: false,
  secondary_line: false,
  status: Status.operacional,
  address: {
    zip_code: "",
    neighborhood: "",
    public_place: "",
    city: "",
    state: "",
    complement: undefined,
    address_number: ""
  }
};

export const machineDefaultValues = {
  model: "",
  machine_number: 0,
  location: "",
  status: Status.operacional,
  location_status: Status.operacional
};

export const procedureDefaultValues = {
  process_name: "",
  workers: 0,
  status: Status.operacional
};

export const productDefaultValues = {
  name: "",
  model: "",
  size: "",
  sales: 0,
  volume_sales: 0,
  invoicing: "0",
  character: "",
  moldes: 0,
  equivalency: 0,
  status: Status.operacional
};

export const vendorDefaultValues = {
  name: "",
  store_name: "",
  cnpj: "",
  cel_number: "",
  phone: "",
  deliver: false,
  volume_purchases: 0,
  purchases: "0",
  invoicing: "0",
  status: Status.operacional,
  address: {
    zip_code: "",
    neighborhood: "",
    public_place: "",
    city: "",
    state: "",
    complement: undefined,
    address_number: ""
  }
};

export const vacationDefaultValues = {
  employee_id: 0,
  start_date: new Date(),
  end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  sold_days: 0,
}
