import { Procedure } from "@/types/procedure.types";
import { CommonRequest } from "@/types/common.types";
import prisma from "@/lib/prisma";

const createProcedure = async (data: Procedure) => {
  return await prisma.procedures.create({ data });
};

const getProcedure = async (id: number) => {
  return await prisma.procedures.findUnique({ where: { id } });
};

const getProcedures = async (filters: CommonRequest) => {
  const { page, perPage } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;
  return await prisma.procedures.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialProcedure = async (id: number, data: any) => {
  const existingProcedure = await prisma.procedures.findUnique({
    where: { id }
  });

  if (!existingProcedure) {
    throw new Error("Procedure not found");
  }

  const updatedProcedure = await prisma.procedures.update({
    where: { id },
    data: {
      ...existingProcedure,
      ...data
    }
  });

  return updatedProcedure;
};

const deleteProcedure = async (id: number) => {
  return await prisma.procedures.delete({ where: { id } });
};

export default {
  createProcedure,
  getProcedure,
  getProcedures,
  updatePartialProcedure,
  deleteProcedure
};
