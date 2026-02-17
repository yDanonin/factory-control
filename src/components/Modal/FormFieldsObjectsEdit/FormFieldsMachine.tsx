"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Status } from "@/types/common.types";
import { Location } from "@/types/location.types";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsMachine {
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

const help = fieldHelpTexts.machine;

export const FormFieldsMachine: React.FC<FormFieldsMachine> = ({ form }) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const resp = await axios.get("/api/locations");
        setLocations(resp.data.data || []);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <>
      <FormField
        key="model"
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="model" label="Modelo" helpText={help.model} />
            <FormControl>
              <Input id="model" {...field} placeholder="Insira o modelo" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="location_id"
        control={form.control}
        name="location_id"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="location_id" label="Localização" helpText={help.location_id} />
            <Select
              onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
              value={field.value?.toString() ?? ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a localização" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.code} - {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="machine_number"
        control={form.control}
        name="machine_number"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabelWithHelp htmlFor="machine_number" label="Número da máquina" helpText={help.machine_number} />
              <FormControl>
                <Input
                  id="machine_number"
                  type="number"
                  {...field}
                  {...form.register("machine_number", {
                    valueAsNumber: true
                  })}
                  placeholder="Insira o número da máquina"
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
            <FormLabelWithHelp htmlFor="status" label="Status" helpText={help.status} />
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status da máquina" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{mapEnumToSelectItems(Status)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="location_status"
        control={form.control}
        name="location_status"
        render={({ field }) => {
          const numericToStatusKey: Record<number, keyof typeof Status> = {
            0: "suspenso",
            1: "operacional"
          };
          const selectedStatusKey = numericToStatusKey[field.value];
          return (
          <FormItem>
            <FormLabelWithHelp htmlFor="location_status" label="Status de Localização" helpText={help.location_status} />
            <Select onValueChange={field.onChange} value={Status[selectedStatusKey]}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status de localização" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{mapEnumToSelectItems(Status)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
      />
    </>
  );
};
