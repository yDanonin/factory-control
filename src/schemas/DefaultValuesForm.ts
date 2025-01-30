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
  credit_limit: "",
  debts: "",
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
  machine_number: "",
  location: "",
  status: Status.operacional,
  location_status: Status.operacional
};

export const procedureDefaultValues = {
  process_name: "",
  workers: "",
  status: Status.operacional
};

export const productDefaultValues = {
  name: "",
  model: "",
  size: "",
  sales: "",
  volume_sales: "",
  invoicing: "",
  character: "",
  moldes: "",
  equivalency: "",
  status: Status.operacional
};

export const vendorDefaultValues = {
  name: "",
  store_name: "",
  cnpj: "",
  cel_number: "",
  phone: "",
  deliver: false,
  volume_purchases: "",
  purchases: "",
  invoicing: "",
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
};

export const orderDefaultValues = {
  final_price: "",
  date: undefined,
  created_at: new Date(),
  updated_at: new Date(),
  customer_id: "",
  products: [],
};

export const materialOrderDefaultValues = {
  amount: "",
  unit: "",
  date: undefined,
  storage_location: "",
  received_by: "",
  product_id: "",
  vendor_id: "",
};

export const productReturnDefaultValues = {
  product_return: {
    date: undefined,
    replacement_necessary: "",
    resold: "",
    return_reason: "",
    order_id: 0,
  },
  returned_labels: []
};

export const paymentDefaultValues = {
  amount_paid: undefined,
  payment_method: "",
  date: new Date(),
  order_id: undefined,
};
