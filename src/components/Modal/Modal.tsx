import React from "react";
import PropTypes from "prop-types";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";
import { Edit } from "./EDIT/Edit";
import { Create } from "./CREATE/Create";
import { Delete } from "./DELETE/Delete";

type TypeModal = "CREATE" | "EDIT" | "DELETE";

interface ModalProps {
  typeModal: TypeModal;
  nameModal: string;
  typeRegister: string;
  rowData?: Partial<Customer> | Partial<Employee>;
  idRowData?: number;
}

const Modal: React.FC<ModalProps> = ({ typeModal, nameModal, typeRegister, rowData, idRowData }) => {
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
        <Edit idRowData={idRowData} rowData={rowData} nameModal={nameModal} />
      </>
    );
  } else if (typeModal === "DELETE") {
    designModalByType = (
      <>
        <Delete idRowData={idRowData} rowData={rowData} nameModal={nameModal} />
      </>
    );
  }

  return <>{designModalByType}</>;
};

Modal.propTypes = {
  typeModal: PropTypes.oneOf<TypeModal>(["CREATE", "EDIT", "DELETE"]).isRequired,
  nameModal: PropTypes.string.isRequired,
  rowData: PropTypes.any,
  idRowData: PropTypes.number
};

export default Modal;
