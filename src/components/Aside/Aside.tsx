"use client";
import React, { useState } from "react";
import "./Aside.css";
import Link from "next/link";

import {
  PencilSquareIcon,
  UserIcon,
  InboxIcon,
  PresentationChartLineIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  Bars3Icon,
  Bars3BottomLeftIcon,
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon
} from "@heroicons/react/24/solid";
import Image from "next/image";

const Aside: React.FC = () => {
  const [menuSize, setMenuSize] = useState(false);

  return (
    <div className={`aside ${menuSize ? "w-[4rem]" : "w-2/12"}`}>
      <div className="aside-head">
        {menuSize ? (
          <>
            <Link href="/">
              <Image src="/white-logo.svg" alt="White Logo" width={40} height={40} />
            </Link>
            <Bars3Icon className="bar-icon" onClick={() => setMenuSize(!menuSize)} />
          </>
        ) : (
          <>
            <Link href="/">
              <header className="title">PONTALTI</header>
            </Link>
            <Bars3BottomLeftIcon className="bar-icon" onClick={() => setMenuSize(!menuSize)} />
          </>
        )}
      </div>

      {/* TODO: Remove this "Links" because this primaries buttons will be just a drop down */}
      <div className="nav">
        <Link href="customers">
          <div className="item">
            <PencilSquareIcon className="icons" />
            <span hidden={menuSize}>Cadastro</span>
          </div>
        </Link>
        <Link href="employees">
          <div className="item">
            <UserIcon className="icons" />
            <span hidden={menuSize}>Funcionários</span>
          </div>
        </Link>
        <Link href="production">
          <div className="item">
            <PresentationChartLineIcon className="icons" />
            <span hidden={menuSize}>Produção</span>
          </div>
        </Link>
        <Link href="receipts">
          <div className="item">
            <InboxIcon className="icons" />
            <span hidden={menuSize}>Recebimentos</span>
          </div>
        </Link>
        <Link href="control">
          <div className="item">
            <Cog6ToothIcon className="icons" />
            <span hidden={menuSize}>Controle</span>
          </div>
        </Link>
        <Link href="spending">
          <div className="item">
            <CurrencyDollarIcon className="icons" />
            <span hidden={menuSize}>Gastos</span>
          </div>
        </Link>
      </div>
      <div className="aside-feet">
        <Link href="/profile">
          <UserCircleIcon className="icons" />
          <span hidden={menuSize}>Eduardo</span>
        </Link>
        <Link href="/login">
          <ArrowLeftEndOnRectangleIcon className="icons" />
        </Link>
      </div>
    </div>
  );
};

export default Aside;
