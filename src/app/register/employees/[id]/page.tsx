"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

import { Step_1_Schema, Step_2_Schema, Step_3_Schema } from "@/validations/customer.validation";
import { RegisterCustomer } from "@/types/form.types";
import { Customer } from "@/types/customer.types";
import Alert from "@/components/Alert";
import Header from "@/components/Aside";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";

enum FORM_STEPS {
  STEP_1,
  STEP_2,
  STEP_3
}

export default function Page({ params }: { params: { id: string } }) {
  const [alert, setAlert] = useState<{ kind: string; title?: string; message: string }>({ kind: "", message: "" });
  const [customer, setCustomer] = useState<Customer>();
  const [formCurrentStep, setFormCurrentStep] = useState<FORM_STEPS>(FORM_STEPS.STEP_1);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`/backend/api/customers/${params.id}`);
      const data = await response.json();
      setCustomer(data);
    };

    fetchCustomers();
  }, [params.id]);

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

  const choosingTheValidationScheme = () => {
    if (formCurrentStep === FORM_STEPS.STEP_1) return Step_1_Schema;
    if (formCurrentStep === FORM_STEPS.STEP_2) return Step_2_Schema;
    if (formCurrentStep === FORM_STEPS.STEP_3) return Step_3_Schema;
  };

  const initialValues: RegisterCustomer = {
    name: customer?.name,
    status: customer?.status,
    phone: customer?.phone,
    cel_number: customer?.cel_number,
    email: customer?.email,
    zip_code: customer?.address.zip_code,
    neighborhood: customer?.address.neighborhood,
    public_place: customer?.address.public_place,
    city: customer?.address.city,
    state: customer?.address.state,
    address_number: customer?.address.address_number,
    complement: customer?.address.complement,
    store_name: customer?.store_name,
    deliver: customer?.deliver ? Number(customer.deliver) : 0,
    pontalti: customer?.pontalti,
    secondary_line: customer?.secondary_line,
    credit_limit: customer?.credit_limit,
    document: customer?.document
  };

  return (
    <div className="flex">
      <Header />
      <div className="w-full flex-col p-10">
        <span className="font-bold text-xl">Detalhes do cliente: {customer?.name}</span>
        <div>
          <button onClick={() => router.back()} color="blue">
            {"<"} Voltar
          </button>
          <button onClick={() => setShowEditCustomerModal(true)}>Editar</button>
        </div>

        <div className="pt-10 grid grid-cols gap-4 divide-y divide-inherit">
          <div>
            <span className="font-bold text-lg">Informações do cliente</span>
          </div>
          <div className="pt-3 space-y-2">
            <p className="text-sm text-slate-700">Nome: {customer?.name}</p>
            <p className="text-sm text-slate-700">Email: {customer?.email}</p>
            <p className="text-sm text-slate-700">Telefone: {customer?.phone}</p>
            <p className="text-sm text-slate-700">CPF/CNPJ: {customer?.document}</p>
          </div>
        </div>
      </div>
      {/* <Modal visible={showEditCustomerModal} closeModal={() => setShowEditCustomerModal(false)}></Modal> */}
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={choosingTheValidationScheme()}
          onSubmit={async (value) => {
            if (formCurrentStep === FORM_STEPS.STEP_1) setFormCurrentStep(FORM_STEPS.STEP_2);
            if (formCurrentStep === FORM_STEPS.STEP_2) setFormCurrentStep(FORM_STEPS.STEP_3);
            if (formCurrentStep === FORM_STEPS.STEP_3) {
              setProcessing(true);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.getElementById("saveButton").disabled = true;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.getElementById("saveButton").style.backgroundColor = "rgb(12 74 110)";

              const address = {
                zip_code: value.zip_code,
                neighborhood: value.neighborhood,
                public_place: value.public_place,
                city: value.city,
                state: value.state,
                address_number: Number(value.address_number),
                complement: value.complement
              };

              const body = {
                name: value.name,
                status: value.status,
                phone: value.phone,
                cel_number: value.cel_number,
                email: value.email,
                store_name: value.store_name,
                deliver: Boolean(value.deliver),
                pontalti: value.pontalti,
                secondary_line: value.secondary_line,
                credit_limit: Number(value.credit_limit),
                document: value.document,
                address: address
              };

              axios
                .patch("api/employees/" + params.id, body)
                .then(() => {
                  setProcessing(false);
                  showSuccess("Cliente foi atualizado com sucesso :)");
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                })
                .catch((e: Error) => {
                  setProcessing(false);
                  showError(e.message);
                })
                .finally(() => {
                  setShowEditCustomerModal(false);
                  setFormCurrentStep(FORM_STEPS.STEP_1);
                });
            }
          }}
        >
          {({ setFieldValue }) => (
            <div className="relative bg-white rounded-lg shadow h-full">
              <div className="py-6 px-6 lg:px-8">
                <Form className="space-y-6">
                  <span className="mb-4 text-xl font-medium">Cadastrar Cliente</span>

                  {formCurrentStep === FORM_STEPS.STEP_1 && (
                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                          <ErrorMessage
                            name={"name"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* CPF/CNPJ */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="document" className="h-6 text-sm text-gray-600">
                            CPF/CNPJ
                          </label>
                          <Field
                            id="document"
                            name="document"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"document"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Status */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="status" className="h-6 text-sm text-gray-600">
                            Status
                          </label>
                          <Field
                            as="select"
                            id="status"
                            name="status"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          >
                            <option value={0}>Suspenso</option>
                            <option value={1}>Operacional</option>
                          </Field>
                          <ErrorMessage
                            name={"status"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Celular */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="cel_number" className="h-6 text-sm text-gray-600">
                            Celular
                          </label>
                          <Field
                            id="cel_number"
                            name="cel_number"
                            placeholder="(00) 99999-9999"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"cel_number"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Telefone */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="phone" className="h-6 text-sm text-gray-600">
                            Telefone
                          </label>
                          <Field
                            id="phone"
                            name="phone"
                            placeholder="(00) 9999-9999"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"phone"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Email */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="email" className="h-6 text-sm text-gray-600">
                            Email
                          </label>
                          <Field
                            id="email"
                            name="email"
                            placeholder="example@email.com"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"email"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>
                      </div>

                      {/* button */}
                      <button type="submit" className={"formSubmit"}>
                        <div className="flex items-center justify-between gap-x-2">
                          Continue para cadastrar o cliente
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                  )}

                  {formCurrentStep === FORM_STEPS.STEP_2 && (
                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Zip Code */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="zip_code" className="h-6 text-sm text-gray-600">
                            CEP
                          </label>
                          <Field
                            id="zip_code"
                            name="zip_code"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onChange={async (e: any) => {
                              const cep = e.target.value;
                              setFieldValue("zip_code", cep);

                              if (cep.length == 8) {
                                try {
                                  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
                                  if (response.data.erro == true) throw new Error();
                                  const { bairro, logradouro, localidade, uf } = response.data;
                                  setFieldValue("neighborhood", bairro);
                                  setFieldValue("public_place", logradouro);
                                  setFieldValue("city", localidade);
                                  setFieldValue("state", uf);
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                } catch (error: any) {
                                  console.error("erro");
                                  console.error(error.message);
                                  showError("Não foi possíve preencher os campos de endereço");
                                }
                              }
                            }}
                          />
                          <ErrorMessage
                            name={"zip_code"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Neighborhood */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="neighborhood" className="h-6 text-sm text-gray-600">
                            Bairro
                          </label>
                          <Field
                            id="neighborhood"
                            name="neighborhood"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"neighborhood"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Public Place */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="public_place" className="h-6 text-sm text-gray-600">
                            Logradouro
                          </label>
                          <Field
                            id="public_place"
                            name="public_place"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"public_place"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* City */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="city" className="h-6 text-sm text-gray-600">
                            Cidade
                          </label>
                          <Field
                            id="city"
                            name="city"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"city"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* State */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="state" className="h-6 text-sm text-gray-600">
                            Estado
                          </label>
                          <Field
                            id="state"
                            name="state"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"state"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* address_number */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="address_number" className="h-6 text-sm text-gray-600">
                            N° Endereço
                          </label>
                          <Field
                            id="address_number"
                            name="address_number"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"address_number"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Complement */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="complement" className="h-6 text-sm text-gray-600">
                            complemento
                          </label>
                          <Field
                            id="complement"
                            name="complement"
                            type="text"
                            placeholder="555.555.555-55"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"complement"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>
                      </div>

                      {/* button */}
                      <button type="submit" className={"formSubmit"}>
                        <div className="flex items-center justify-between gap-x-2">
                          Continue para cadastrar o cliente
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                  )}

                  {formCurrentStep === FORM_STEPS.STEP_3 && (
                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Store Name */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="store_name" className="h-6 text-sm text-gray-600">
                            Nome da loja
                          </label>
                          <Field
                            id="store_name"
                            name="store_name"
                            type="text"
                            placeholder="John Snow"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"name"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Credit Limit */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="credit_limit" className="h-6 text-sm text-gray-600">
                            Limite de Crédito
                          </label>
                          <Field
                            id="credit_limit"
                            name="credit_limit"
                            type="text"
                            placeholder="1000.00 R$"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={"name"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        {/* Deliver */}
                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative ">
                          <label htmlFor="deliver" className="h-6 text-sm text-gray-600">
                            Entrega/Retirada
                          </label>
                          <Field
                            as="select"
                            id="deliver"
                            name="deliver"
                            className="border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500"
                          >
                            <option value={0}>Retirar</option>
                            <option value={1}>Entregar</option>
                          </Field>
                          <ErrorMessage
                            name={"deliver"}
                            component="span"
                            className="text-red-400 text-[14px] block font-bold"
                          />
                        </div>

                        <div className="flex w-full lg:w-full flex-col gap-y-2 mb-3 relative">
                          {/* Pontalti */}
                          <label htmlFor="pontalti" className="h-6 text-sm text-gray-600">
                            <Field type="checkbox" name="pontalti" className="mr-2" />
                            Marca Pontalti?
                          </label>

                          {/* Secondary Line */}
                          <label htmlFor="secondary_line" className="h-6 text-sm text-gray-600">
                            <Field type="checkbox" name="secondary_line" className="mr-2" />
                            Compra Segunda Linha?
                          </label>
                        </div>
                      </div>

                      <div className="flex lg:flex-row lg:justify-end flex-col gap-x-5 pt-11">
                        {/* button */}
                        <button
                          type="submit"
                          id="saveButton"
                          className="inline-flex justify-center gap-1 items-center cursor-pointer text-white bg-sky-400 border border-blue-300 hover:bg-cyan-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:focus:ring-blue-800 px-5 h-10"
                        >
                          Cadastrar
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex lg:flex-row lg:justify-end flex-col gap-x-5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditCustomerModal(false);
                        setFormCurrentStep(FORM_STEPS.STEP_1);
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
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </>
      <Alert
        {...alert}
        onClose={() => {
          setAlert({ kind: "", message: "" });
        }}
      />
      <Spinner visible={processing} message="Processando" />
    </div>
  );
}
