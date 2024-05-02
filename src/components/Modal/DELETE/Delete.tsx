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
}

export const Delete: React.FC<ModalEditProps> = ({ nameModal, typeRegister, idRowData }) => {
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
          <AlertDialogAction onClick={() => deleteData()}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};
