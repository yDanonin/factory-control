import React from "react";
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
// import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";

interface ModalEditProps {
  nameModal: string;
  rowData?: Partial<Customer> | Partial<Employee>;
  idRowData?: number;
}

export const Delete: React.FC<ModalEditProps> = ({ nameModal, rowData, idRowData }) => {
  console.log(rowData, idRowData);
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
          <AlertDialogAction>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};
