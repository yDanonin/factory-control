"use client";
import React from "react";

import { VacationPage } from "./vacation";

import Aside from "@/components/Aside";
import Header from "@/components/Header";

import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className="page-layout">
        <nav className="aside-layout">
          <Aside />
        </nav>
        <main className="main-layout">
          <Header title="Controle de Férias" />

          {session.user.isAdmin && <VacationPage/> }
        </main>
      </div>
    );
  }
}

export default Page;
