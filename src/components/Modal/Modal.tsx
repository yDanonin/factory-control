import React, { useEffect } from "react";
import { Create } from "./CREATE/Create";
import { Edit } from "./EDIT/Edit";
import { Delete } from "./DELETE/Delete";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";
import { User } from "@/types/user.types";

type TypeModal = "CREATE" | "EDIT" | "DELETE";

interface ModalProps {
  typeModal: TypeModal;
  nameModal: string;
  typeRegister: string;
  idRowData?: number;
  rowData?: Partial<Customer> | Partial<Employee> | Partial<User>;
  onDelete?: () => void;
}

const Modal: React.FC<ModalProps> = ({ typeModal, rowData, nameModal, typeRegister, idRowData, onDelete }) => {
  useEffect(() => {
    if (rowData) {
      console.log("Edit component mounted or rowData changed", rowData);
    }
  }, [rowData]);
  let designModalByType = null;

  if (typeModal === "CREATE") {
    designModalByType = (
      <>
        <Create nameModal={nameModal} typeRegister={typeRegister} />
      </>
    );
  } else if (typeModal === "EDIT") {
    designModalByType = (
      <>
        {console.log("CHAMANDO O EDIT")}
        <Edit idRowData={idRowData} rowData={rowData} nameModal={nameModal} typeRegister={typeRegister} />
      </>
    );
  } else if (typeModal === "DELETE") {
    designModalByType = (
      <>
        <Delete idRowData={idRowData} nameModal={nameModal} typeRegister={typeRegister} onDelete={onDelete} />
      </>
    );
  }

  return <>{designModalByType}</>;
  // return <Edit idRowData={idRowData} rowData={rowData} nameModal={nameModal} typeRegister={typeRegister} />;
};

export default Modal;
