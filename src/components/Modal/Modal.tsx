import React from "react";
import PropTypes from "prop-types";
import { Edit } from "./EDIT/Edit";
import { Create } from "./CREATE/Create";
import { Delete } from "./DELETE/Delete";
import { Vendor } from "@/types/vendor.types";
import { Machine } from "@/types/machine.types";
import { Product } from "@/types/product.types";
import { Customer } from "@/types/customer.types";
import { Employee } from "@/types/employee.types";
import { Procedure } from "@/types/procedure.types";

type TypeModal = "CREATE" | "EDIT" | "DELETE";

interface ModalProps {
  typeModal: TypeModal;
  nameModal: string;
  typeRegister: string;
  rowData?:
    | Partial<Customer>
    | Partial<Employee>
    | Partial<Machine>
    | Partial<Procedure>
    | Partial<Product>
    | Partial<Vendor>;
  idRowData?: number;
  onDelete?: () => void
}

const Modal: React.FC<ModalProps> = ({ typeModal, nameModal, typeRegister, rowData, idRowData, onDelete }) => {
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
        <Delete idRowData={idRowData} nameModal={nameModal} typeRegister={typeRegister} onDelete={onDelete}/>
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
