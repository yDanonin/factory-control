"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

import { customerValidation } from "@/validations/customer.validation";
import { Customer } from "@/types/customer.types";
import Alert from "@/components/Alert";
import Aside from "@/components/Aside";
import Background from "@/components/Background";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import "./Customers.css";

export default function Page() {
  const [alert, setAlert] = useState<{ kind: string; title?: string; message: string }>({ kind: "", message: "" });
  const [customers, setCustomers] = useState([]);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState<boolean>(false);
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

  const showSuccess = (message: string) => {
    setAlert({
      kind: "success",
      message: message,
      title: "Nice"
    });
  };

  const showError = (message: string) => {
    setAlert({
      kind: "danger",
      message: message,
      title: "Ops!"
    });
  };

  return (
    <div className="flex">
      <Background />
      <Aside />
      <div className="flex-col w-full h-full">
        <Button>Buscar</Button>
        <Button>Limpar</Button>
        <Button>Imprimir</Button>
        {/* TODO: pass styling to css file */}
        <Button onClick={() => setShowAddCustomerModal(true)}>Cadastrar</Button>
        <Modal visible={showAddCustomerModal} closeModal={() => setShowAddCustomerModal(false)}>
          <Formik
            initialValues={{
              name: "",
              status: "",
              phone: "",
              cel_number: "",
              addressId: "",
              email: "",
              store_name: "",
              deliver: "",
              pontalti: "",
              secondary_line: "",
              credit_limit: "",
              cpf: ""
            }}
            validationSchema={customerValidation}
            onSubmit={async (value) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.getElementById("saveButton").disabled = true;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.getElementById("saveButton").style.backgroundColor = "rgb(12 74 110)";

              const body = {
                name: value.name,
                status: value.status,
                phone: value.phone,
                cel_number: value.cel_number,
                email: value.email,
                store_name: value.store_name,
                deliver: value.deliver,
                pontalti: value.pontalti,
                secondary_line: value.secondary_line,
                credit_limit: value.credit_limit,
                cpf: value.cpf
              };
              axios
                .post("/api/customers/", body)
                .then(() => {
                  showSuccess("Customer registered successfully");
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                })
                .catch((e: Error) => {
                  showError(e.message);
                });
            }}
          >
            <div className="relative bg-white rounded-lg shadow ">
              <div className="py-6 px-6 lg:px-8">
                <Form className="space-y-6">
                  <span className="mb-4 text-xl font-medium">Cadastrar Cliente</span>

                  {/* Name */}
                  <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                    <label htmlFor="name" className="h-6 text-sm text-gray-600">
                      Nome
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Snow"
                      className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage name={"name"} component="span" className="text-red-400 text-[14px] block font-bold" />
                  </div>

                  {/* buttons */}
                  <div className="flex lg:flex-row lg:justify-end flex-col gap-x-5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddCustomerModal(false);
                      }}
                      className="absolute top-3 right-2.5 text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-800 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>

                    <button
                      type="submit"
                      id="saveButton"
                      className="inline-flex justify-center gap-1 items-center cursor-pointer text-white bg-sky-400 border border-blue-300 hover:bg-cyan-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:focus:ring-blue-800 px-5 h-10"
                    >
                      Cadastrar
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </Formik>
        </Modal>
        <Alert
          {...alert}
          onClose={() => {
            setAlert({ kind: "", message: "" });
          }}
        />

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
