import { Address } from "@/types/address.types";
import { CommonRequest } from "@/types/common.types";
import prisma from "@/lib/prisma";

const createAddress = async (data: Address) => {
  return await prisma.adresses.create({ data });
};

const getAddress = async (id: number) => {
  return await prisma.adresses.findUnique({ where: { id } });
};

const getAdresses = async (filters: CommonRequest) => {
  const { page, perPage } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;
  const adresses = await prisma.adresses.findMany({
    take: perPage,
    skip: skip
  });
  return adresses;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialAddress = async (id: number, data: any) => {
  const existingAddress = await prisma.adresses.findUnique({
    where: { id }
  });

  if (!existingAddress) {
    throw new Error("Address not found");
  }

  const updatedAddress = await prisma.adresses.update({
    where: { id },
    data: {
      ...existingAddress,
      ...data
    }
  });

  return updatedAddress;
};

const deleteAddress = async (id: number) => {
  return await prisma.adresses.delete({ where: { id } });
};

export default {
  createAddress,
  getAddress,
  getAdresses,
  updatePartialAddress,
  deleteAddress
};
