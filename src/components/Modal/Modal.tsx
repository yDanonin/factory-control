import React, { useState } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";

type TypeModal = "CREATE" | "EDIT" | "DELETE";

interface ModalProps {
  type: TypeModal;
  nameModal: string;
  typeInformation?: Partial<Customer> | Partial<Employee>;
  idTypeInformation?: number;
}

const Modal: React.FC<ModalProps> = ({ type, nameModal, typeInformation, idTypeInformation }) => {
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const handleInputChange = (key: string, value: string) => {
    setEditedValues({ ...editedValues, [key]: value });
  };
  const handleContinueClick = async (editedValues: Record<string, string>) => {
    try {
      await axios.patch(`/api/customers/${idTypeInformation}`, editedValues);
    } catch (err) {
      console.error(err);
    }
    console.log("Valores editados:", editedValues);
  };

  let designModalByType = null;

  if (type === "CREATE") {
    designModalByType = (
      <>
        <AlertDialogTrigger>
          <Button variant="default">Criar {nameModal}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{}</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </>
    );
  } else if (type === "EDIT") {
    designModalByType = (
      <>
        <AlertDialogTrigger>Editar {nameModal}</AlertDialogTrigger>
        <AlertDialogContent className="min-w-1/2">
          <AlertDialogHeader>
            <AlertDialogTitle>Editando {nameModal}</AlertDialogTitle>
            <AlertDialogDescription className="w-full grid grid-cols-4 gap-4">
              {typeof typeInformation === "object" &&
                typeInformation &&
                Object.entries(typeInformation).map(([key, value]) => {
                  if (key !== "id") {
                    return (
                      <div key={key}>
                        <Label htmlFor="picture">{key}</Label>
                        <Input
                          value={editedValues[key] || value}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleContinueClick(editedValues)}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </>
    );
  } else if (type === "DELETE") {
    designModalByType = (
      <>
        <AlertDialogTrigger>Deletar {nameModal}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja deletar este {nameModal}</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não poderá ser desfeita. Tenha certeza que você está deletando o {nameModal} correto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </>
    );
  }

  return <>{designModalByType}</>;
};

Modal.propTypes = {
  type: PropTypes.oneOf<TypeModal>(["CREATE", "EDIT", "DELETE"]).isRequired,
  nameModal: PropTypes.string.isRequired,
  typeInformation: PropTypes.any,
  idTypeInformation: PropTypes.number
};

export default Modal;
