import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";

interface BooleanLabels {
  [fieldName: string]: Record<0 | 1, string>;
}

interface AnyObject {
  [key: string]: string | boolean | number | Partial<Customer> | Partial<Employee> | Date;
}

const booleanLabels: BooleanLabels = {
  pontalti: {
    0: "Sim",
    1: "Não"
  },
  secondary_line: {
    0: "Sim",
    1: "Não"
  },
  deliver: {
    0: "Entrega",
    1: "Retirada"
  },
  status: {
    0: "suspenso",
    1: "operacional"
  }
};

export const getBooleanLabel = (fieldName: string, value: 0 | 1): string | undefined => {
  const labelMapping = booleanLabels[fieldName] ? booleanLabels[fieldName] : booleanLabels["default"];
  if (labelMapping) {
    if (value === 0 || value === 1) {
      return labelMapping[value];
    } else if (value === "option-one") {
      return labelMapping[0];
    } else if (value === "option-two") {
      return labelMapping[1];
    } else if (value === "Sim") {
      return "true";
    } else if (value === "Não") {
      return "false";
    }
  }
  return undefined;
};

export const convertOptionsToBoolean = (obj: AnyObject): AnyObject => {
  const newObj: AnyObject = { ...obj };
  for (const key in newObj) {
    if (newObj[key] === "option-one") {
      newObj[key] = true;
    } else if (newObj[key] === "option-two") {
      newObj[key] = false;
    } else if (newObj[key] === "Sim") {
      newObj[key] = true;
    } else if (newObj[key] === "Não") {
      newObj[key] = false;
    }
  }
  return newObj;
};
