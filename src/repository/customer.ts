import { Customer, CustomerRegister, CustomerRequest } from "@/types/customer.types";
import prisma from "@/lib/prisma";
import { PaginationResponse } from "@/types/common.types";

const defaultSelectedFieldForCustomers = {
  id: true,
  status: true,
  addressId: true,
  credit_limit: true,
  name: true,
  phone: true,
  cel_number: true,
  email: true,
  store_name: true,
  deliver: true,
  pontalti: true,
  secondary_line: true,
  cpf: true,
  cnpj: true,
  address: {
    select: {
      id: true,
      zip_code: true,
      neighborhood: true,
      public_place: true,
      city: true,
      state: true,
      complement: true,
      address_number: true
    }
  }
};

const createCustomer = async (data: CustomerRegister) => {
  const { address, ...customerData } = data;
  return await prisma.customers.create({
    data: {
      ...customerData,
      address: {
        create: address
      }
    },
    include: {
      address: true
    }
  });
};

const getCustomer = async (id: number) => {
  return await prisma.customers.findUnique({ where: { id }, select: defaultSelectedFieldForCustomers });
};

const getCustomers = async (filters: CustomerRequest) => {
  const {
    page,
    perPage,
    id,
    name,
    cpf,
    cnpj,
    store_name,
    cel_number,
    phone,
    pontalti,
    status,
    deliver,
    secondary_line
  } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;

  // prettier-ignore
  const whereClause = id ? { id } : {
    name: { contains: name },
    cpf: { contains: cpf },
    cnpj: { contains: cnpj },
    store_name: { contains: store_name },
    cel_number: { contains: cel_number },
    phone: { contains: phone },
    pontalti: pontalti,
    status: status,
    deliver: deliver,
    secondary_line: secondary_line
  };

  const result = await prisma.customers.findMany({
    where: whereClause,
    select: defaultSelectedFieldForCustomers,
    take: perPage,
    skip: skip
  });

  const totalRecords = await prisma.customers.count({
    where: whereClause
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customers = result.map((item: any) => {
    return { ...item } as Customer;
  });

  const hasMoreItems = await prisma.customers.count({
    where: {
      id: {
        gt: customers[customers.length - 1]?.id || 0
      }
    }
  });

  const nextPage = hasMoreItems ? page! + 1 : undefined;

  return {
    data: customers,
    totalRecord: totalRecords,
    page: page ?? 1,
    perPage: perPage,
    nextPage: nextPage ? `/api/customers?page=${nextPage}` : undefined
  } as PaginationResponse<Customer>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialCustomer = async (id: number, data: any) => {
  const existingCustomer = await prisma.customers.findUnique({
    where: { id }
  });

  if (!existingCustomer) {
    throw new Error("Customer not found");
  }

  const updatedCustomer = await prisma.customers.update({
    where: { id },
    data: {
      ...existingCustomer,
      ...data
    },
    select: defaultSelectedFieldForCustomers
  });

  return updatedCustomer;
};

const deleteCustomer = async (id: number) => {
  return await prisma.customers.delete({ where: { id }, select: defaultSelectedFieldForCustomers });
};

export default {
  createCustomer,
  getCustomer,
  getCustomers,
  updatePartialCustomer,
  deleteCustomer
};
