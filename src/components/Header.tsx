import React from "react";
import "./Header.css";
import {
  PencilAltIcon,
  UserIcon,
  InboxInIcon,
  PresentationChartLineIcon,
  CogIcon,
  CurrencyDollarIcon
} from "@heroicons/react/solid";

const Header: React.FC = () => {
  return (
    <div className="header">
      <span className="title">PONTALTI</span>
      <div className="nav">
        <div className="item">
          <PencilAltIcon className="icons" />
          <span>Cadastro</span>
        </div>
        <div className="item text-gray-500">
          <UserIcon className="icons" />
          <span>Funcionários</span>
        </div>
        <div className="item text-gray-500">
          <PresentationChartLineIcon className="icons" />
          <span>Produção</span>
        </div>
        <div className="item text-gray-500">
          <InboxInIcon className="icons" />
          <span>Recebimentos</span>
        </div>
        <div className="item text-gray-500">
          <CogIcon className="icons" />
          <span>Controle</span>
        </div>
        <div className="item text-gray-500">
          <CurrencyDollarIcon className="icons" />
          <span>Gastos</span>
        </div>
        {/* Rest of the code here */}
      </div>
    </div>
  );
};

export default Header;
