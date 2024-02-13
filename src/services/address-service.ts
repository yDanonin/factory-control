import { Address } from "@/types/address.types";
import { CommonRequest } from "@/types/common.types";
import repository from "@/repository/address";

type Filters = CommonRequest & {
  cep: string;
}

const handleAddress = (c: Address | Address[]) => {
  return c
};

const createAddress = async (data: Address) => {
  return handleAddress((await repository.createAddress(data)) as Address);
};

const getAllAdresses = async (filters: Filters) => {
  return handleAddress((await repository.getAdresses(filters)) as Address[]);
};

const getAddressById = async (id: number) => {
  return handleAddress((await repository.getAddress(id)) as Address);
};

const updatePartialAddress = async (id: number, data: any) => {
  return handleAddress((await repository.updatePartialAddress(id, data)) as Address);
};

const deleteAddress = async (id: number) => {
  return handleAddress((await repository.deleteAddress(id)) as Address);
};

export default {
  createAddress,
  getAddressById,
  getAllAdresses,
  updatePartialAddress,
  deleteAddress
};
