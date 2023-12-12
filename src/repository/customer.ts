import { Customer } from "@/types/customer.types"
import prisma from "@/lib/prisma"

const createCustomer = async (data: Customer) => {
  return await prisma.customers.create({ data });
}

const getCustomer = async (id: number) => {
  return await prisma.customers.findUnique({ where: { id }});
}

const getCustomers = async () => {
  return await prisma.customers.findMany();
}

const updateCustomer = async (data: Customer) => {
  const id = data.id;
  return await prisma.customers.update({ where: { id }, data });
}

const deleteCustomer = async (data: Customer) => {
  const id = data.id;
  return await prisma.customers.delete({ where: { id }})
}

export default {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
}
