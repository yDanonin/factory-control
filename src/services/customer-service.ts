import { Customer } from "@/types/customer.types"
import { CustomerRequest } from "@/types/customer.types";
import repository from "@/repository/customer"

const createCustomer = async (data: Customer) => {
  return repository.createCustomer(data);
};

const getAllCustomers = async (filters: CustomerRequest) => {
  return repository.getCustomers(filters);
};

const getCustomerById = async (id: number) => {
  return repository.getCustomer(id);
};

const updatePartialCustomer = async (id: number, data: any) =>{
  return repository.updatePartialCustomer(id, data);
};

const deleteCustomer = async (id: number) => {
  return repository.deleteCustomer(id);
};

export default {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updatePartialCustomer,
  deleteCustomer
};
