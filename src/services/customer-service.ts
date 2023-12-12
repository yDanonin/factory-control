import { Customer } from "@/types/customer.types"
import repository from "@/repository/customer"

const createCustomer = async (data: Customer) => {
  return repository.createCustomer(data);
}

export default {
  createCustomer
}
