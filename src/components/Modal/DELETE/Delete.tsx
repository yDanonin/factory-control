import React, { useState } from "react";

import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface ModalEditProps {
  nameModal: string;
  typeRegister: string;
  idRowData?: number;
  onDelete?: () => void;
}

export const Delete: React.FC<ModalEditProps> = ({ nameModal, typeRegister, idRowData, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  let apiCallByType: string;
  if (typeRegister === "Customer") {
    apiCallByType = "customers";
  } else if (typeRegister === "Employee") {
    apiCallByType = "employees";
  } else if (typeRegister === "Machine") {
    apiCallByType = "machines";
  } else if (typeRegister === "Procedure") {
    apiCallByType = "procedures";
  } else if (typeRegister === "Product") {
    apiCallByType = "products";
  } else if (typeRegister === "Vendor") {
    apiCallByType = "vendors";
  } else {
    throw new Error(`Invalid typeRegister: ${typeRegister}`);
  }

  async function deleteData() {
    setIsLoading(true);
    try {
      await axios.delete(`/api/${apiCallByType}/${idRowData}`);
      setIsLoading(false);
      toast({
        title: "Excluir",
        description: `${nameModal} foi excluído com sucesso.`
      });
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: `Erro ao excluir - ${error.code}`,
        description: error.message
      });
    }
  }

  const afterDelete = () => {
    if(onDelete) {
      return onDelete()
    } 
    else {
      return location.reload()
    }
  }

  return (
    <>
      <DialogTrigger>Deletar {nameModal}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar este {nameModal}</DialogTitle>
          <DialogDescription>
            Esta ação não poderá ser desfeita. Tenha certeza que você está deletando o {nameModal} correto.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deletando...
            </Button>
          ) : (
            <Button onClick={() => deleteData().then(() => {afterDelete()})}>Deletar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </>
  );
};
