"use client";

import React, { useEffect, useState } from "react";

import "./ExpenseDetails.css";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense, ExpenseResponsibleType } from "@/types/expense.types";

export default function Page({ params }: { params: { id: string } }) {
  const [expense, setExpense] = useState<Expense>();

  const router = useRouter();

  useEffect(() => {
    const loadExpenseData = async () => {
      try {
        // Buscar dados da API
        const response = await fetch(`/api/expenses/${params.id}`);
        const data = await response.json();
        setExpense(data);
        console.log('Dados da despesa carregados:', data);
      } catch (err) {
        console.error("Error loading expense details:", err);
      }
    };

    loadExpenseData();
  }, [params.id]);

  const getResponsibleTypeBadge = (type: number): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case ExpenseResponsibleType.EMPLOYEE: return "default";
      case ExpenseResponsibleType.ORDER: return "secondary";
      case ExpenseResponsibleType.CUSTOMER: return "outline";
      case ExpenseResponsibleType.VENDOR: return "destructive";
      default: return "default";
    }
  };

  const getResponsibleTypeLabel = (type: number): string => {
    switch (type) {
      case ExpenseResponsibleType.EMPLOYEE: return "Funcionário";
      case ExpenseResponsibleType.ORDER: return "Pedido";
      case ExpenseResponsibleType.CUSTOMER: return "Cliente";
      case ExpenseResponsibleType.VENDOR: return "Fornecedor";
      default: return "Desconhecido";
    }
  };

  const getActorDisplayName = (actor: any): string => {
    if (!actor) return "Não informado";
    
    if (actor.first_name && actor.last_name) {
      return `${actor.first_name} ${actor.last_name}`;
    }
    if (actor.store_name) {
      return actor.store_name;
    }
    if (actor.name) {
      return actor.name;
    }
    return "Nome não disponível";
  };

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <div className="grid px-20 pb-4 gap-4">
          <Header title="Detalhes da Despesa" backTo="/spent/expenses" />
          {expense && (
            <div className="space-y-6">
              {/* Card Principal com Informações Básicas */}
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Despesa #{expense.id}
                    </CardTitle>
                    <CardDescription>
                      <div className="text-xs text-muted-foreground">
                        Data da despesa: {new Date(expense.expense_date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Criada em: {new Date(expense.created_at).toLocaleDateString()}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Badge variant={expense.requires_reimbursement ? "destructive" : "outline"}>
                      {expense.requires_reimbursement ? "Requer Reembolso" : "Sem Reembolso"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-semibold">Valor da Despesa</div>
                        <div className="text-3xl font-bold text-red-600">
                          R$ {parseFloat(expense.amount).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">Classificação</div>
                        <div className="text-lg">
                          {expense.classification || "Não classificada"}
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="font-semibold">Justificativa</div>
                      <div className="text-base mt-1 p-3 bg-muted/30 rounded-md">
                        {expense.justification}
                      </div>
                    </div>
                    {expense.description && (
                      <>
                        <Separator />
                        <div>
                          <div className="font-semibold">Descrição</div>
                          <div className="text-base mt-1 p-3 bg-muted/30 rounded-md">
                            {expense.description}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Card de Informações do Responsável */}
              <Card>
                <CardHeader>
                  <CardTitle>Responsável pela Despesa</CardTitle>
                  <CardDescription>
                    Informações sobre quem foi responsável por esta despesa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="font-medium text-lg">
                        {getActorDisplayName(expense.actor)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ID do Ator: {expense.expense_actor_id}
                      </div>
                      {expense.actor?.email && (
                        <div className="text-sm text-muted-foreground">
                          Email: {expense.actor.email}
                        </div>
                      )}
                      {expense.actor?.phone && (
                        <div className="text-sm text-muted-foreground">
                          Telefone: {expense.actor.phone}
                        </div>
                      )}
                    </div>
                    <Badge variant={getResponsibleTypeBadge(expense.expense_actor_id)}>
                      {getResponsibleTypeLabel(expense.expense_actor_id)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Aplicabilidade */}
              <Card>
                <CardHeader>
                  <CardTitle>Aplicabilidade da Despesa</CardTitle>
                  <CardDescription>
                    Define a quais produtos e máquinas esta despesa se aplica
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${expense.applies_all_products ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-medium">Produtos</div>
                        <div className="text-sm text-muted-foreground">
                          {expense.applies_all_products ? "Aplica a todos os produtos" : "Não aplica a todos os produtos"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${expense.applies_all_machines ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-medium">Máquinas</div>
                        <div className="text-sm text-muted-foreground">
                          {expense.applies_all_machines ? "Aplica a todas as máquinas" : "Não aplica a todas as máquinas"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Auditoria */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Auditoria</CardTitle>
                  <CardDescription>
                    Histórico de criação e alterações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium">Criação</div>
                      <div className="text-sm text-muted-foreground">
                        Data: {new Date(expense.created_at).toLocaleString()}
                      </div>
                      {expense.created_by && (
                        <div className="text-sm text-muted-foreground">
                          Por: {expense.created_by}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Última Atualização</div>
                      <div className="text-sm text-muted-foreground">
                        Data: {new Date(expense.updated_at).toLocaleString()}
                      </div>
                      {expense.updated_by && (
                        <div className="text-sm text-muted-foreground">
                          Por: {expense.updated_by}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
