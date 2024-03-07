import { Customer, CustomerRequest, CustomerStatusString } from "@/types/customer.types";
import { PaginationResponse, Status } from "@/types/common.types";
import repository from "@/repository/customer";

const handleStatusInCustomer = (c: Customer | PaginationResponse<Customer>) => {
  if ("data" in c) {
    const { data, ...customer } = c;
    const newData = data.map((data: Customer) => {
      const { status, ...customer } = data;
      return { ...customer, status: Status[status] };
    });
    const response = { data: newData, ...customer } as PaginationResponse<CustomerStatusString>;
    return response;
  }

  const { status, ...customer } = c;
  return { ...customer, status: Status[status] };
};

const createCustomer = async (data: Customer) => {
  try {
    return handleStatusInCustomer((await repository.createCustomer(data)) as Customer);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const getAllCustomers = async (filters: CustomerRequest) => {
  try {
    return handleStatusInCustomer((await repository.getCustomers(filters)) as PaginationResponse<Customer>);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const getCustomerById = async (id: number) => {
  try {
    return handleStatusInCustomer((await repository.getCustomer(id)) as Customer);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const updatePartialCustomer = async (id: number, data: unknown) => {
  try {
    return handleStatusInCustomer((await repository.updatePartialCustomer(id, data)) as Customer);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const deleteCustomer = async (id: number) => {
  try {
    return handleStatusInCustomer((await repository.deleteCustomer(id)) as Customer);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updatePartialCustomer,
  deleteCustomer
};
