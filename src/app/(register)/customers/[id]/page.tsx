"use client";

import React, { useEffect, useState } from "react";

import { Customer } from "@/types/customer.types";
import Header from "@/components/Header";

export default function Page({ params }: { params: { id: string } }) {
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`/api/customers/${params.id}`);
      const data = await response.json();
      console.log(data);
      setCustomer(data);
    };

    fetchCustomers();
  }, [params.id]);

  return (
    <div className="flex">
      <Header />
      <div className="flex flex-col">
        <span>Nome: {customer?.name}</span>
        <span>Email: {customer?.email}</span>
        <span>Telefone: {customer?.phone}</span>
        <span>CPF/CNPJ: {customer?.cpf}</span>
      </div>
    </div>
  );
}
