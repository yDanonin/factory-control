import { Product } from "@/types/product.types";
import { CommonRequest } from "@/types/common.types";
import prisma from "@/lib/prisma";

const createProduct = async (data: Product) => {
  return await prisma.products.create({ data });
};

const getProduct = async (id: number) => {
  return await prisma.products.findUnique({ where: { id } });
};

const getProducts = async (filters: CommonRequest) => {
  const { page, perPage } = filters;
  const skip = page !== 1 ? (page - 1) * perPage : undefined;
  return await prisma.products.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialProduct = async (id: number, data: any) => {
  const existingProduct = await prisma.products.findUnique({
    where: { id }
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const updatedProduct = await prisma.products.update({
    where: { id },
    data: {
      ...existingProduct,
      ...data
    }
  });

  return updatedProduct;
};

const deleteProduct = async (id: number) => {
  return await prisma.products.delete({ where: { id } });
};

export default {
  createProduct,
  getProduct,
  getProducts,
  updatePartialProduct,
  deleteProduct
};
