import React from "react";
import axios from "axios";
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

interface ModalEditProps {
  nameModal: string;
  typeRegister: string;
  idRowData?: number;
  onDelete?: () => void;
}

export const Delete: React.FC<ModalEditProps> = ({ nameModal, typeRegister, idRowData, onDelete}) => {
  let apiCallByType: string;
  if (typeRegister === "Customer") {
    apiCallByType = "customers";
  } else if (typeRegister === "Employee") {
    apiCallByType = "employees";
  } else if (typeRegister === "Machine") {
    apiCallByType = "machines";
  } else if (typeRegister === "Procedure") {
    apiCallByType = "procedures";
  } else if (typeRegister === "Product") {
    apiCallByType = "products";
  } else if (typeRegister === "Vendor") {
    apiCallByType = "vendors";
  } else {
    throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  async function deleteData() {
    try {
      await axios.delete(`/api/${apiCallByType}/${idRowData}`);
    } catch (err) {
      console.error(err);
    }
  }

  const afterDelete = () => {
    if(onDelete) {
      return onDelete()
    } 
    else {
      return location.reload()
    }
  }

  return (
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
          <AlertDialogAction onClick={() => deleteData().then(() => {afterDelete()})}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};
