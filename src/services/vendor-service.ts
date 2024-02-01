import { Vendor } from "@/types/vendor.types";
import { Status, CommonRequest } from "@/types/common.types";
import repository from "@/repository/vendor";

const handleVendor = (e: Vendor | Vendor[]) => {
  if (Array.isArray(e)) {
    const response = e.map((data: Vendor) => {
      const { status, ...vendor } = data;
      return { ...vendor, status: Status[status] };
    });
    return response;
  }

  const { status, ...vendor } = e;
  return { ...vendor, status: Status[status] };
};

const createVendor = async (data: Vendor) => {
  return handleVendor((await repository.createVendor(data)) as Vendor);
};

const getAllVendors = async (filters: CommonRequest) => {
  return handleVendor((await repository.getVendors(filters)) as Vendor[]);
};

const getVendorById = async (id: number) => {
  return handleVendor((await repository.getVendor(id)) as Vendor);
};

const updatePartialVendor = async (id: number, data: unknown) => {
  return handleVendor((await repository.updatePartialVendor(id, data)) as Vendor);
};

const deleteVendor = async (id: number) => {
  return handleVendor((await repository.deleteVendor(id)) as Vendor);
};

export default {
  createVendor,
  getVendorById,
  getAllVendors,
  updatePartialVendor,
  deleteVendor
};
