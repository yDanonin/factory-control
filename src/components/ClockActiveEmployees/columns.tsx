"use client";

import { ColumnDef } from "@tanstack/react-table";

export type EmployeeActive = {
  name: string;
  cpf: string;
  primeiroPonto: Date;
};

export const columns: ColumnDef<EmployeeActive>[] = [
  {
    header: "Nome",
    accessorKey: "name"
  },
  {
    header: "Cpf",
    accessorKey: "cpf"
  },
  {
    header: "Primeiro Ponto",
    accessorKey: "primeiroPonto"
  }
];

export const data = [
  {
    name: "João Silva",
    cpf: "123.456.789-00",
    primeiroPonto: "2020-06-06"
  },
  {
    name: "Ana Pereira",
    cpf: "234.567.890-11",
    primeiroPonto: "2020-06-06"
  },
  {
    name: "Carlos Souza",
    cpf: "345.678.901-22",
    primeiroPonto: "2020-06-06"
  },
  {
    name: "Beatriz Oliveira",
    cpf: "456.789.012-33",
    primeiroPonto: "2020-06-06"
  },
  {
    name: "Daniel Costa",
    cpf: "567.890.123-44",
    primeiroPonto: "2020-06-06"
  },
  {
    name: "Elisa Mendes",
    cpf: "678.901.234-55",
    primeiroPonto: "2020-06-06"
  },
  {
    name: "Fernando Lima",
    cpf: "789.012.345-66",
    primeiroPonto: "2020-06-06"
  }
];
