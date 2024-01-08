import { Status } from "@/types/customer.types";

export const getCustomersStatus = (status: Status): string => {
  switch (status) {
    case Status.operacional:
      return "Operacional";
    case Status.suspenso:
      return "Suspenso";
    default:
      return "";
  }
};
