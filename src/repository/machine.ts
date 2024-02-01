import { Machine } from "@/types/machine.types";
import { CommonRequest } from "@/types/common.types";
import prisma from "@/lib/prisma";

const createMachine = async (data: Machine) => {
  return await prisma.machines.create({ data });
};

const getMachine = async (id: number) => {
  return await prisma.machines.findUnique({ where: { id } });
};

const getMachines = async (filters: CommonRequest) => {
  const { page, perPage } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;
  return await prisma.machines.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialMachine = async (id: number, data: any) => {
  const existingMachine = await prisma.machines.findUnique({
    where: { id }
  });

  if (!existingMachine) {
    throw new Error("Machine not found");
  }

  const updatedMachine = await prisma.machines.update({
    where: { id },
    data: {
      ...existingMachine,
      ...data
    }
  });

  return updatedMachine;
};

const deleteMachine = async (id: number) => {
  return await prisma.machines.delete({ where: { id } });
};

export default {
  createMachine,
  getMachine,
  getMachines,
  updatePartialMachine,
  deleteMachine
};
