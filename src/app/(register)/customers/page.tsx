"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Customer } from "@/types/customer.types";
import Aside from "@/components/Aside";
import Background from "@/components/Background";
import "./Customers.css";

export default function Page() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch("/api/customers");
      const data = await response.json();
      console.log(data);
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="flex">
      <Background />
      <Aside />
      <table className="table">
        <thead>
          <tr>
            <th className="tableh">Id</th>
            <th className="tableh">Nome</th>
            <th className="tableh">CPF/CNPJ</th>
            <th className="tableh">Whatsapp</th>
            <th className="tableh">Telefone Fixo</th>
            <th className="tableh">Endereço</th>
            <th className="tableh">Nome da Loja</th>
            <th className="tableh">Outros</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: Customer) => (
            <tr key={customer.id}>
              <td className="tabled">{customer.id}</td>
              <td className="tabled">{customer.name}</td>
              <td className="tabled">{customer.cpf}</td>
              <td className="tabled">{customer.cel_number}</td>
              <td className="tabled">{customer.phone}</td>
              <td className="tabled">{customer.addressId}</td>
              <td className="tabled">{customer.store_name}</td>
              <td className="tabled">
                <button className="btn" onClick={() => router.push(`/customers/${customer.id}`)}>
                  Ver Mais
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
