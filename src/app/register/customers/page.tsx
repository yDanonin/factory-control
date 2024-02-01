"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Customer } from "@/types/customer.types";
import Aside from "@/components/Aside";
import Background from "@/components/Background";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import "./Customers.css";

export default function Page() {
  const [customers, setCustomers] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
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
      <div className="flex-col w-full h-full">
        <Button>Buscar</Button>
        <Button>Limpar</Button>
        <Button>Imprimir</Button>
        {/* teste para o modal */}
        <Button onClick={() => setModalVisible(true)}>Cadastrar</Button>
        <Modal visible={modalVisible} title="Neymar é foda" closeModal={() => setModalVisible(false)}>
          <span>E o Naruto também</span>
        </Modal>

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
                  <Button onClick={() => router.push(`/register/customers/${customer.id}`)}>Ver Mais</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
