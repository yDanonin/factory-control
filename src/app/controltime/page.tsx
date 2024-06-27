"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users } from "lucide-react";
import { formatTime } from "@/services/formatDate";
import DynamicTable from "@/components/DynamicTable";
import { Separator } from "@/components/ui/separator";
import { useCurrentAdminRole } from "@/services/useCurrentAdminRole";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function Page() {
  const [clockIn, setClockIn] = useState<string>();
  const [clockOut, setClockOut] = useState<string>();

  const [time, setTime] = useState(new Date());
  const isAdmin = useCurrentAdminRole();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTimePart = (part: number) => {
    return part.toString().padStart(2, "0");
  };

  const hours = formatTimePart(time.getHours());
  const minutes = formatTimePart(time.getMinutes());
  const seconds = formatTimePart(time.getSeconds());

  function timeClick() {
    setClockIn(formatTime(time));
  }

  let mainContent;
  if (isAdmin) {
    mainContent = (
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader>
              <Users className="h-7 w-7 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium">Total da Qtd de Funcionário</CardTitle>
            </CardContent>
            <CardFooter>
              <p className="text-2xl font-bold">2350</p>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader>
              <Users className="h-7 w-7 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#16a34a]"></div>
                <CardTitle className="text-sm font-medium">Total de Ativos Agora</CardTitle>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-2xl font-bold">2350</p>
            </CardFooter>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Funcionarios Ativos Agora</CardTitle>
                <CardDescription>Funcionários que bateram o ponto hoje</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>tabela</CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Ponto Online</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="w-full flex justify-center gap-2">
                  <p className="text-2xl text-[#2563eb] font-bold">{hours}h</p>
                  <p className="text-2xl text-black font-bold">:</p>
                  <p className="text-2xl text-[#2563eb] font-bold">{minutes}m</p>
                  <p className="text-2xl text-black font-bold">:</p>
                  <p className="text-2xl text-[#2563eb] font-bold">{seconds}s</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-3">
                    <p className="text-base font-semibold text-muted-foreground leading-none tracking-tight">Entrada</p>
                    <p className="text-base text-[#2563eb] font-semibold">{clockIn ? clockIn : "--:--"}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-base font-semibold text-muted-foreground leading-none tracking-tight">Saída</p>
                    <p className="text-base text-[#2563eb] font-semibold">{clockOut ? clockOut : "--:--"}</p>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="w-full flex justify-center">
                <Button className="w-3/4" variant="outline" onClick={() => timeClick()}>
                  Bater ponto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else {
    mainContent = <div>não admin</div>;
  }
  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <Header title="Controle de Horários" />
        {mainContent}
      </main>
    </div>
  );
}

export default Page;
