"use client";
import React from "react";

import { Admin } from "./admin";
import { Employee } from "./employee";
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
          <Header title="Controle de Horários" />
          {session.user.isAdmin === true ? <Admin /> : <Employee idUser={session.user.idToken} />}
        </main>
      </div>
    );
  }
}

export default Page;
