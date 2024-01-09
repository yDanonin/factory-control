import { Employee } from "@/types/employee.types";
import { CommonRequest } from "@/types/common.types";
import prisma from "@/lib/prisma";

const createEmployee = async (data: Employee) => {
  return await prisma.employees.create({ data });
};

const getEmployee = async (id: number) => {
  return await prisma.employees.findUnique({ where: { id } });
};

const getEmployees = async (filters: CommonRequest) => {
  const { page, perPage } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;
  return await prisma.employees.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialEmployee = async (id: number, data: any) => {
  const existingEmployee = await prisma.employees.findUnique({
    where: { id }
  });

  if (!existingEmployee) {
    throw new Error("Employee not found");
  }

  const updatedEmployee = await prisma.employees.update({
    where: { id },
    data: {
      ...existingEmployee,
      ...data
    }
  });

  return updatedEmployee;
};

const deleteEmployee = async (id: number) => {
  return await prisma.employees.delete({ where: { id } });
};

export default {
  createEmployee,
  getEmployee,
  getEmployees,
  updatePartialEmployee,
  deleteEmployee
};
