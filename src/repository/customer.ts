import { Customer, CustomerRequest } from "@/types/customer.types"
import prisma from "@/lib/prisma"

const createCustomer = async (data: Customer) => {
  return await prisma.customers.create({ data });
}

const getCustomer = async (id: number) => {
  return await prisma.customers.findUnique({ where: { id }});
}

const getCustomers = async (filters: CustomerRequest) => {
  const { page, perPage } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;
  return await prisma.customers.findMany({
    take: perPage,
    skip: skip,
  });
}

const updatePartialCustomer = async (id: number, data: any) => {
  const existingCustomer = await prisma.customers.findUnique({
    where: { id },
  });

  if (!existingCustomer) {
    throw new Error('Customer not found');
  }

  const updatedCustomer = await prisma.customers.update({
    where: { id },
    data: {
      ...existingCustomer,
      ...data,
    },
  });

  return await prisma.customers.update({ where: { id }, data });
}

const deleteCustomer = async (id: number) => {
  return await prisma.customers.delete({ where: { id }})
}

export default {
  createCustomer,
  getCustomer,
  getCustomers,
  updatePartialCustomer,
  deleteCustomer
}
