"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Status } from "@/types/common.types";
import { UseFormReturn } from "react-hook-form";
import { getBooleanLabel } from "@/services/formatInputs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldsCustomer {
  form: UseFormReturn;
}

type EnumType<T> = {
  [key: string]: T;
};

function mapEnumToSelectItems<T extends string>(enumObj: EnumType<T>): JSX.Element[] {
  return Object.keys(enumObj).map((key) => (
    <SelectItem key={key} value={enumObj[key]}>
      {String(enumObj[key])}
    </SelectItem>
  ));
}

export const FormFieldsCustomer: React.FC<FormFieldsCustomer> = ({ form }) => {
  return (
    <>
      <FormField
        key="name"
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <FormControl>
              <Input id="name" {...field} placeholder="Insira o nome" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="phone"
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="telefone">Número de Telefone</FormLabel>
            <FormControl>
              <Input id="phone" {...field} placeholder="(xx) xxxxx-xxxx" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="cel_number"
        control={form.control}
        name="cel_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="numero_celular">Número de Celular</FormLabel>
            <FormControl>
              <Input id="cel_number" {...field} placeholder="(xx) xxxxx-xxxx" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="email"
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input id="email" {...field} placeholder="Insira o email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="store_name"
        control={form.control}
        name="store_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="nome_loja">Nome da Loja</FormLabel>
            <FormControl>
              <Input id="store_name" {...field} placeholder="Insira o nome da loja" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="credit_limit"
        control={form.control}
        name="credit_limit"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="credit_limit">Limite de Crédito</FormLabel>
              <FormControl>
                <Input
                  id="credit_limit"
                  type="number"
                  {...field}
                  {...form.register("credit_limit", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o límite de crédito"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="debts"
        control={form.control}
        name="debts"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="debitos">Débitos</FormLabel>
              <FormControl>
                <Input
                  id="debts"
                  type="number"
                  {...field}
                  {...form.register("debts", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o límite de crédito"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="cpf"
        control={form.control}
        name="cpf"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="cpf">Cpf</FormLabel>
            <FormControl>
              <Input id="cpf" {...field} placeholder="Insira o cpf" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="cnpj"
        control={form.control}
        name="cnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="cnpj">Cnpj</FormLabel>
            <FormControl>
              <Input id="cnpj" {...field} placeholder="Insira o cnpj" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="deliver"
        control={form.control}
        name="deliver"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="deliver">Entrega ou Retirada?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange}>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" id={`option-one-deliver`} />
                  </FormControl>
                  <FormLabel className="font-normal">{getBooleanLabel("deliver", 0)}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" id={`option-two-deliver`} />
                  </FormControl>
                  <FormLabel className="font-normal">{getBooleanLabel("deliver", 1)}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="pontalti"
        control={form.control}
        name="pontalti"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="pontalti">É da Pontalti?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange}>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" id={`option-one-pontalti`} />
                  </FormControl>
                  <FormLabel className="font-normal">{getBooleanLabel("pontalti", 0)}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" id={`option-two-pontalti`} />
                  </FormControl>
                  <FormLabel className="font-normal">{getBooleanLabel("pontalti", 1)}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="secondary_line"
        control={form.control}
        name="secondary_line"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="secondary_line">É linha secundária?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange}>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" id={`option-one-secondary_line`} />
                  </FormControl>
                  <FormLabel className="font-normal">{getBooleanLabel("secondary_line", 0)}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" id={`option-two-secondary_line`} />
                  </FormControl>
                  <FormLabel className="font-normal">{getBooleanLabel("secondary_line", 1)}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="status"
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status da operação" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{mapEnumToSelectItems(Status)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="address.zip_code"
        control={form.control}
        name="address.zip_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="cep">CEP</FormLabel>
            <FormControl>
              <Input id="zip_code" {...field} placeholder="Insira o CEP" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="address.neighborhood"
        control={form.control}
        name="address.neighborhood"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="neighborhood">Bairro</FormLabel>
            <FormControl>
              <Input id="neighborhood" {...field} placeholder="Insira o bairro" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="address.public_place"
        control={form.control}
        name="address.public_place"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="public_place">Logradouro</FormLabel>
            <FormControl>
              <Input id="public_place" {...field} placeholder="Insira o logradouro" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="address.city"
        control={form.control}
        name="address.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="city">Cidade</FormLabel>
            <FormControl>
              <Input id="city" {...field} placeholder="Insira o cidade" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="address.state"
        control={form.control}
        name="address.state"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="state">Estado</FormLabel>
            <FormControl>
              <Input id="state" {...field} placeholder="Insira o estado" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="address.complement"
        control={form.control}
        name="address.complement"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="complement">Complemento</FormLabel>
            <FormControl>
              <Input id="complement" {...field} placeholder="Insira o complemento" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="address.address_number"
        control={form.control}
        name="address.address_number"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="debitos">Número</FormLabel>
              <FormControl>
                <Input
                  id="address_number"
                  type="number"
                  {...field}
                  {...form.register("address.address_number", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o Número"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};
