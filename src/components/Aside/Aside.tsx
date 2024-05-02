"use client";
import React from "react";

import "./Aside.css";
import {
  menuItensCadastro,
  menuItensControle,
  menuItensFuncionarios,
  menuItensGastos,
  menuItensProducao,
  menuItensRecebimento
} from "./MenuItens";
import Divider from "../Divider/Divider";
import MenuHoverButton from "@/components/MenuHoverButton";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import LogoPontalti from "../LogoPontalti/LogoPontalti";
import { DollarSign, FileCog, Inbox, Package2, SquarePlus, Users } from "lucide-react";

const Aside: React.FC = () => {
  return (
    <div className="h-screen pt-5 flex flex-col content-center items-center border-r border-zinc-800">
      <LogoPontalti />
      <Divider />
      <p className="text-xs font-bold text-[#64748b] mr-auto ml-6 my-2 sm:max-2xl:mx-auto">MENU</p>
      <div className="flex flex-wrap justify-center items-center">
        <MenuHoverButton name={"Cadastro"} menuItens={menuItensCadastro}>
          <SquarePlus color="#64748b" />
        </MenuHoverButton>
        <MenuHoverButton name={"Recebimento"} menuItens={menuItensRecebimento}>
          <Inbox color="#64748b" />
        </MenuHoverButton>
        <MenuHoverButton name={"Funcionarios"} menuItens={menuItensFuncionarios}>
          <Users color="#64748b" />
        </MenuHoverButton>
        <MenuHoverButton name={"Controle"} menuItens={menuItensControle}>
          <FileCog color="#64748b" />
        </MenuHoverButton>
        <MenuHoverButton name={"Producão"} menuItens={menuItensProducao}>
          <Package2 color="#64748b" />
        </MenuHoverButton>
        <MenuHoverButton name={"Gastos"} menuItens={menuItensGastos}>
          <DollarSign color="#64748b" />
        </MenuHoverButton>
      </div>
      <ModeToggle className="absolute bottom-0 right-0 -translate-y-1/2 -translate-x-1/2"></ModeToggle>
    </div>
  );
};

export default Aside;
