import { Product } from "@/types/product.types";
import { Status, CommonRequest } from "@/types/common.types";
import repository from "@/repository/product";

const handleProduct = (e: Product | Product[]) => {
  if (Array.isArray(e)) {
    const response = e.map((data: Product) => {
      const { status, ...product } = data;
      return { ...product, status: Status[status] };
    });
    return response;
  }

  const { status, ...product } = e;
  return { ...product, status: Status[status] };
};

const createProduct = async (data: Product) => {
  return handleProduct((await repository.createProduct(data)) as Product);
};

const getAllProducts = async (filters: CommonRequest) => {
  return handleProduct((await repository.getProducts(filters)) as Product[]);
};

const getProductById = async (id: number) => {
  return handleProduct((await repository.getProduct(id)) as Product);
};

const updatePartialProduct = async (id: number, data: unknown) => {
  return handleProduct((await repository.updatePartialProduct(id, data)) as Product);
};

const deleteProduct = async (id: number) => {
  return handleProduct((await repository.deleteProduct(id)) as Product);
};

export default {
  createProduct,
  getProductById,
  getAllProducts,
  updatePartialProduct,
  deleteProduct
};
