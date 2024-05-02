import { format } from "date-fns";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";
import { Machine } from "@/types/machine.types";
import { Procedure } from "@/types/procedure.types";
import { Product } from "@/types/product.types";
import { Vendor } from "@/types/vendor.types";

type AnyObject = {
  [key: string]:
    | string
    | boolean
    | number
    | Date
    | Partial<Customer>
    | Partial<Employee>
    | Partial<Machine>
    | Partial<Procedure>
    | Partial<Product>
    | Partial<Vendor>;
};

type FormattedObject = {
  [K in keyof AnyObject]: AnyObject[K] extends Date ? string : AnyObject[K];
};

type BooleanLabels = {
  [fieldName: string]: Record<0 | 1, string>;
};

// Na necessidade de adicionar mais um campo booleano, adicionar mais um objeto aqui com os textos que deseja mostrar no front
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

export function formatDates(obj: Record<string, unknown>): FormattedObject {
  const formattedObj: FormattedObject = {} as FormattedObject;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value instanceof Date) {
        formattedObj[key as keyof FormattedObject] = format(value, "yyyy-MM-dd");
      } else {
        formattedObj[key as keyof FormattedObject] = value as FormattedObject[keyof FormattedObject];
      }
    }
  }
  return formattedObj;
}

const convertOptionsToBoolean = (obj: AnyObject): AnyObject => {
  const newObj: AnyObject = { ...obj };
  for (const key in newObj) {
    if (newObj[key] === "true") {
      newObj[key] = true;
    } else if (newObj[key] === "false") {
      newObj[key] = false;
    }
  }
  return newObj;
};

// na necessidade de avaliar outros enums, adicionar na chamada do replaceEnumValuesWithIndexes, os novos Enums
export function replaceEnumValuesWithIndexes<T extends Record<string, unknown>>(
  obj: T,
  enums: Record<string, unknown>[]
): T {
  const newObj: T = { ...obj };
  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      const value = newObj[key];
      for (const enumObject of enums) {
        const enumValueIndex = Object.values(enumObject).indexOf(value);
        if (enumValueIndex !== -1) {
          newObj[key] = enumValueIndex as T[Extract<keyof T, string>];
          break;
        }
      }
    }
  }
  return newObj;
}

export function formatObject(obj: AnyObject, enums: Record<string, unknown>[]): AnyObject {
  let formattedObj: AnyObject = { ...obj };
  formattedObj = convertOptionsToBoolean(formattedObj);
  formattedObj = replaceEnumValuesWithIndexes(formattedObj, enums);
  formattedObj = formatDates(formattedObj);
  return formattedObj;
}

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
