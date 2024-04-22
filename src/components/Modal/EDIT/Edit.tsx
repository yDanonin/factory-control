import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getBooleanLabel } from "@/services/booleanLabelService";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";
import axios from "axios";
import React, { useState } from "react";

interface ModalEditProps {
  nameModal: string;
  rowData?: Partial<Customer> | Partial<Employee>;
  idRowData?: number;
}

export const Edit: React.FC<ModalEditProps> = ({ nameModal, rowData, idRowData }) => {
  const [editedValues, setEditedValues] = useState({});

  const handleChange = (key: string, value: unknown) => {
    if (value === "option-one") {
      value = false;
    } else if (value === "option-two") {
      value = true;
    }
    setEditedValues({ ...editedValues, [key]: value });
    console.log(editedValues);
  };

  const handleContinueClick = async () => {
    try {
      await axios.patch(`/api/customers/${idRowData}`, editedValues);
    } catch (err) {
      console.error(err);
    }
    console.log("Valores editados:", editedValues);
  };

  return (
    <>
      <AlertDialogTrigger>Editar {nameModal}</AlertDialogTrigger>
      <AlertDialogContent className="min-w-1/2">
        <AlertDialogHeader>
          <AlertDialogTitle>Editando {nameModal}</AlertDialogTitle>
          <AlertDialogDescription className="w-full grid grid-cols-4 gap-4">
            {typeof rowData === "object" &&
              rowData &&
              Object.entries(rowData).map(([key, value]) => {
                value = value === null ? "" : value;
                if (!key.toLowerCase().includes("id")) {
                  if (typeof value === "boolean") {
                    return (
                      <div key={key}>
                        <Label htmlFor="picture">{key}</Label>
                        <RadioGroup
                          defaultValue={value ? "option-one" : "option-two"}
                          onValueChange={(value) => handleChange(key, value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id={`option-one-${key}`} />
                            <Label htmlFor={`option-one-${key}`}>{getBooleanLabel(key, 0)}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id={`option-two-${key}`} />
                            <Label htmlFor={`option-two-${key}`}>{getBooleanLabel(key, 1)}</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    );
                  } else {
                    return (
                      <div key={key}>
                        <Label htmlFor="picture">{key}</Label>
                        <Input defaultValue={value} onChange={(e) => handleChange(key, e.target.value)} />
                      </div>
                    );
                  }
                }
                return null;
              })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueClick}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};
