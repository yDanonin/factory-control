"use client";

import React from "react";

import axios from "axios";
import { withMask } from "use-mask-input";
import { Input } from "@/components/ui/input";
import { Status } from "@/types/common.types";
import { UseFormReturn } from "react-hook-form";
import { getBooleanLabel } from "@/services/formatInputs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldsVendor {
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

export const FormFieldsVendor: React.FC<FormFieldsVendor> = ({ form }) => {
  function cleanFieldsAddress(): void {
    form.setValue("address.public_place", "");
    form.setValue("address.neighborhood", "");
    form.setValue("address.city", "");
    form.setValue("address.state", "");
  }

  async function captureCep(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (!e.target.value.includes("_") && e.target.value !== "") {
      try {
        const resp = await axios.get(`http://viacep.com.br/ws/${e.target.value}/json/`);
        if (resp.data.error) {
          cleanFieldsAddress();
          return;
        }
        const { logradouro, bairro, localidade, uf } = resp.data;
        form.setValue("address.public_place", logradouro);
        form.setValue("address.neighborhood", bairro);
        form.setValue("address.city", localidade);
        form.setValue("address.state", uf);
      } catch (error) {
        cleanFieldsAddress();
        console.error("Erro ao buscar o CEP:", error);
      }
    } else {
      cleanFieldsAddress();
    }
  }

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
        key="cnpj"
        control={form.control}
        name="cnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="cnpj">Cnpj</FormLabel>
            <FormControl>
              <Input id="cnpj" {...field} ref={withMask("99.999.999/9999-99")} placeholder="99.999.999/9999-99" />
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
              <Input id="phone" {...field} ref={withMask("(99) 9999-9999")} placeholder="ex. (99) 99999-9999" />
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
              <Input id="cel_number" {...field} ref={withMask("(99) 99999-9999")} placeholder="ex. (99) 9999-9999" />
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
        key="invoicing"
        control={form.control}
        name="invoicing"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="invoicing">Faturamento</FormLabel>
              <FormControl>
                <div className="relative ml-auto flex-1">
                  <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground">R$</span>
                  <Input
                    id="invoicing"
                    type="number"
                    {...field}
                    className="w-full rounded-lg bg-background pl-8 pt-2.5"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="purchases"
        control={form.control}
        name="purchases"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="purchases">Compras</FormLabel>
              <FormControl>
                <div className="relative ml-auto flex-1">
                  <span className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground">R$</span>
                  <Input
                    id="purchases"
                    type="number"
                    {...field}
                    className="w-full rounded-lg bg-background pl-8 pt-2.5"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="volume_purchases"
        control={form.control}
        name="volume_purchases"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="volume_purchases">Volume das Compras</FormLabel>
              <FormControl>
                <Input
                  id="volume_purchases"
                  type="number"
                  {...field}
                  {...form.register("volume_purchases", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o volume das compras"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
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
                  <SelectValue placeholder="Selecione um status do vendedor" />
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
            <FormControl onChange={captureCep}>
              <Input {...field} ref={withMask("99999-999")} id="zip_code" placeholder="99999-999" />
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
              <Input id="public_place" {...field} value={field.value} placeholder="ex. Avenida Brasil" />
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
              <Input id="neighborhood" {...field} value={field.value} placeholder="ex. Vila Madalena" />
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
              <Input id="city" {...field} value={field.value} placeholder="ex. São Paulo" />
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
              <Input id="state" {...field} value={field.value} placeholder="ex. SP" />
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
                <Input id="address_number" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        key="address.complement"
        control={form.control}
        name="address.complement"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="complement">Complemento</FormLabel>
            <FormControl>
              <Input id="complement" {...field} placeholder="ex. Bloco A, Apto 99" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
