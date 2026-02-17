"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Location } from "@/types/location.types";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabelWithHelp } from "@/components/ui/form-label-with-help";
import { fieldHelpTexts } from "@/config/field-help-texts";

interface FormFieldsStockProps {
  form: UseFormReturn;
}

const help = fieldHelpTexts.stock;

export const FormFieldsStock: React.FC<FormFieldsStockProps> = ({ form }) => {
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
        key="product_id"
        control={form.control}
        name="product_id"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="product_id" label="ID do Produto" helpText={help.productId} />
            <FormControl>
              <Input id="product_id" type="number" {...field} {...form.register("product_id", { valueAsNumber: true })} placeholder="Insira o ID do produto" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        key="amount"
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabelWithHelp htmlFor="amount" label="Quantidade" helpText={help.amount} />
            <FormControl>
              <Input id="amount" type="number" {...field} {...form.register("amount", { valueAsNumber: true })} placeholder="Insira a quantidade" />
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
            <FormLabelWithHelp htmlFor="location_id" label="Localização" helpText={help.locationId} />
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
    </>
  );
};


