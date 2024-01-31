import { Customer, Status } from "@/types/customer.types";
import { CommonRequest } from "@/types/common.types";
import repository from "@/repository/customer";

const handleCustomer = (c: Customer | Customer[]) => {
  if (Array.isArray(c)) {
    const response = c.map((data: Customer) => {
      const { status, ...customer } = data;
      return { ...customer, status: Status[status] };
    });
    return response;
  }

  const { status, ...customer } = c;
  return { ...customer, status: Status[status] };
};

const createCustomer = async (data: Customer) => {
  return handleCustomer((await repository.createCustomer(data)) as Customer);
};

const getAllCustomers = async (filters: CommonRequest) => {
  return handleCustomer((await repository.getCustomers(filters)) as Customer[]);
};

const getCustomerById = async (id: number) => {
  return handleCustomer((await repository.getCustomer(id)) as Customer);
};

const updatePartialCustomer = async (id: number, data: any) => {
  return handleCustomer((await repository.updatePartialCustomer(id, data)) as Customer);
};

const deleteCustomer = async (id: number) => {
  return handleCustomer((await repository.deleteCustomer(id)) as Customer);
};

export default {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updatePartialCustomer,
  deleteCustomer
};
