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
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { useState } from "react";

type TypeModal = "CREATE" | "EDIT" | "DELETE";
interface ModalProps {
  type: TypeModal;
  nameModal: string;
  typeInformation?: unknown;
}

const Modal: React.FC<ModalProps> = ({ type, nameModal, typeInformation }) => {
  let designModalByType = null;
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  console.log(typeInformation);
  const handleInputChange = (key: string, value: string) => {
    setEditedValues({ ...editedValues, [key]: value });
    console.log(editedValues);
  };

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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editando {nameModal}?</AlertDialogTitle>
            <AlertDialogDescription>
              {typeof typeInformation === "object" &&
                typeInformation &&
                Object.entries(typeInformation).map(([key, value]) => {
                  if (key !== "id") {
                    return (
                      <Input
                        key={key}
                        value={editedValues[key] || value}
                        onChange={(newValue) => handleInputChange(key, newValue)}
                      />
                    );
                  }
                  return null;
                })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
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
              Esta acão não poderá ser desfeita. Tenha certeza que você está deletando o {nameModal} correto.
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
  typeInformation: PropTypes.any
};

export default Modal;
