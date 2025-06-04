"use client";

import React, { useState, useEffect } from "react";
import { format, startOfMonth, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft } from "lucide-react";
import "./Calendar.css";
import { DayContent, useDayRender } from "react-day-picker";

// Exemplo de datas especiais do mês de junho de 2025
const rawFeriados = [new Date(2025, 5, 12), new Date(2025, 5, 19)];
const rawEntregas = [new Date(2025, 5, 12), new Date(2025, 5, 24)];
const rawFuncionarios = [new Date(2025, 5, 19)];

function filterValidDates(arr: Date[]) {
  return arr.filter(d => d instanceof Date && !isNaN(d.getTime()));
}

const feriados = filterValidDates(rawFeriados);
const entregas = filterValidDates(rawEntregas);
const funcionarios = filterValidDates(rawFuncionarios);

if (feriados.length !== rawFeriados.length) {
  console.warn('Feriados contém datas inválidas:', rawFeriados);
}
if (entregas.length !== rawEntregas.length) {
  console.warn('Entregas contém datas inválidas:', rawEntregas);
}
if (funcionarios.length !== rawFuncionarios.length) {
  console.warn('Funcionarios contém datas inválidas:', rawFuncionarios);
}

const modifiers = {
  feriado: feriados,
  entrega: entregas,
  funcionario: funcionarios,
};

const modifiersClassNames = {
  feriado: 'has-dot-red',
  entrega: 'has-dot-yellow',
  funcionario: 'has-dot-blue',
};

const getDayDots = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return [];
  const dots = [];
  if (feriados.some(d => d instanceof Date && d.getTime() === date.getTime())) dots.push('dot-red');
  if (entregas.some(d => d instanceof Date && d.getTime() === date.getTime())) dots.push('dot-yellow');
  if (funcionarios.some(d => d instanceof Date && d.getTime() === date.getTime())) dots.push('dot-blue');
  return dots;
};

console.log('feriados:', feriados);
console.log('entregas:', entregas);
console.log('funcionarios:', funcionarios);

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate || !isValid(selectedDate)) return;
    setDate(selectedDate);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/calendar-data?date=${format(selectedDate, 'yyyy-MM-dd')}`);
      setData(response.data);
    } catch (err) {
      setError("Erro ao carregar dados para a data selecionada");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(startOfMonth(month));
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
                selected={date && isValid(date) ? date : undefined}
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
                  head_row: "flex gap-x-3",
                  head_cell: "head_cell h-9 font-normal text-[1rem] text-center",
                  row: "flex w-full mt-2 gap-x-3",
                  cell: "cell text-center text-sm relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "custom-day-btn h-9 p-0 font-normal aria-selected:opacity-100",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible"
                }}
                components={{
                  Day: (props: any) => {
                    const { date, displayMonth } = props;
                    const buttonRef = React.useRef<HTMLButtonElement>(null);
                    const dayRender = useDayRender(date, displayMonth, buttonRef);

                    if (dayRender.isHidden) {
                      return <div role="gridcell"></div>;
                    }
                    if (!dayRender.isButton) {
                      return <div {...dayRender.divProps} />;
                    }

                    const dots = getDayDots(date);

                    return (
                      <button {...dayRender.buttonProps} ref={buttonRef} className={`custom-day-btn ${dayRender.buttonProps.className || ""}`}>
                        {dots.length > 0 && (
                          <div className="dot-row">
                            {dots.map((color, idx) => (
                              <span key={idx} className={color} />
                            ))}
                          </div>
                        )}
                        <span className="day-number">{date.getDate()}</span>
                      </button>
                    );
                  }
                }}
              />
              <div className="calendar-legend">
                <span className="calendar-legend-item">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" /> Feriado
                </span>
                <span className="calendar-legend-item">
                  <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-1" /> Entrega
                </span>
                <span className="calendar-legend-item">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1" /> Férias
                </span>
              </div>
            </div>
            <div className="details-section">
              <div className="details-header">
                <h2 className="text-lg font-semibold">
                  {date && isValid(date)
                    ? `Detalhes do dia ${format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`
                    : "Selecione um dia"}
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
