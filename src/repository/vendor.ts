import { Vendor } from "@/types/vendor.types";
import { CommonRequest } from "@/types/common.types";
import prisma from "@/lib/prisma";

const createVendor = async (data: Vendor) => {
  return await prisma.vendors.create({ data });
};

const getVendor = async (id: number) => {
  return await prisma.vendors.findUnique({ where: { id } });
};

const getVendors = async (filters: CommonRequest) => {
  const { page, perPage } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;
  return await prisma.vendors.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialVendor = async (id: number, data: any) => {
  const existingVendor = await prisma.vendors.findUnique({
    where: { id }
  });

  if (!existingVendor) {
    throw new Error("Vendor not found");
  }

  const updatedVendor = await prisma.vendors.update({
    where: { id },
    data: {
      ...existingVendor,
      ...data
    }
  });

  return updatedVendor;
};

const deleteVendor = async (id: number) => {
  return await prisma.vendors.delete({ where: { id } });
};

export default {
  createVendor,
  getVendor,
  getVendors,
  updatePartialVendor,
  deleteVendor
};
