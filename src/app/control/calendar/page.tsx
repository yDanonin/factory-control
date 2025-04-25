"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft } from "lucide-react";
import "./Calendar.css";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    setDate(selectedDate);
    setLoading(true);
    setError(null);
    
    try {
      // Replace this with your actual API endpoint
      const response = await axios.get(`/api/calendar-data?date=${format(selectedDate, 'yyyy-MM-dd')}`);
      setData(response.data);
    } catch (err) {
      setError("Erro ao carregar dados para a data selecionada");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <Header title="Calendário" />
        <div className="content-container">
          <div className="calendar-grid">
            <div className="calendar-section">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                locale={ptBR}
                className="w-full"
                classNames={{
                  months: "space-y-4",
                  month: "space-y-4",
                  caption: "flex justify-center relative items-center h-10",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse",
                  head_row: "flex",
                  head_cell: "w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
            
            <div className="details-section">
              <div className="details-header">
                <h2 className="text-lg font-semibold">
                  Detalhes do dia {format(date!, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </h2>
              </div>

              {loading && (
                <div className="status-message loading">
                  <p>Carregando informações...</p>
                </div>
              )}
              
              {error && (
                <div className="status-message error">
                  <p>{error}</p>
                </div>
              )}
              
              {data && !loading && !error && (
                <div className="data-container">
                  <pre className="data-content">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
