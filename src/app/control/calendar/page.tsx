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

import Holidays from 'date-holidays';

const hd = new Holidays('BR', 'SP', '3550308');

function getFeriadosDoMes(ano: number, mes: number) {
  const feriadosAno = hd.getHolidays(ano);
  return feriadosAno
    .filter(f => f.date)
    .map(f => new Date(f.date))
    .filter(d => d.getMonth() === mes && d.getFullYear() === ano);
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
  const [feriados, setFeriados] = useState<Date[]>([]);
  const [feriadoInfo, setFeriadoInfo] = useState<string | null>(null);
  const [vacationDates, setVacationDates] = useState<string[]>([]);
  const [deliveryDates, setDeliveryDates] = useState<string[]>([]);

  useEffect(() => {
    const ano = currentMonth.getFullYear();
    const mes = currentMonth.getMonth() + 1;
    setFeriados(getFeriadosDoMes(ano, currentMonth.getMonth()));
    const fetchMonthData = async () => {
      try {
        const response = await axios.get(`/api/calendar?month=${String(mes).padStart(2, '0')}&year=${ano}`);
        const result = response.data;
        setVacationDates(result?.vacations?.datesWithEvents || []);
        setDeliveryDates(result?.deliveries?.datesWithEvents || []);
      } catch (e) {
        setVacationDates([]);
        setDeliveryDates([]);
      }
    };
    fetchMonthData();
  }, [currentMonth]);

  useEffect(() => {
    if (date && isValid(date)) {
      // Busca o feriado do dia selecionado
      const feriadosAno = hd.getHolidays(date.getFullYear());
      const feriadoDoDia = feriadosAno.find(f => {
        if (!f.date) return false;
        const d = new Date(f.date);
        return d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate();
      });
      setFeriadoInfo(feriadoDoDia ? feriadoDoDia.name : null);
    } else {
      setFeriadoInfo(null);
    }
  }, [date]);

  const getDayDots = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return [];
    const dots = [];
    if (feriados.some(d => d.getTime() === date.getTime())) dots.push('dot-red');
    if (vacationDates.some(d => new Date(d).toDateString() === date.toDateString())) dots.push('dot-yellow');
    if (deliveryDates.some(d => new Date(d).toDateString() === date.toDateString())) dots.push('dot-blue');
    return dots;
  };

  const fetchData = async (selectedDate: Date) => {
    setLoading(true);
    setError(null);
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      const month = format(selectedDate, "MM");
      const year = format(selectedDate, "yyyy");
      const response = await axios.get(`/api/calendar?month=${month}&year=${year}&date=${formattedDate}`);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate || !isValid(selectedDate)) return;
    setDate(selectedDate);
    await fetchData(selectedDate);
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
                onMonthChange={handleMonthChange}
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
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1" /> Entrega
                </span>
                <span className="calendar-legend-item">
                  <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-1" /> Férias
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
              {feriadoInfo && (
                <div className="status-message" style={{ background: '#fee2e2', color: '#b91c1c', marginBottom: 8 }}>
                  <strong>Feriado:</strong> {feriadoInfo}
                </div>
              )}
              {data && data.vacations && Array.isArray(data.vacations.entries) &&
                date && data.vacations.entries
                  .filter((entry: any) => new Date(entry.date).toDateString() === date.toDateString())
                  .map((entry: any, idx: number) => (
                    <div key={idx} className="status-message" style={{ background: '#fef9c3', color: '#b45309', marginBottom: 8 }}>
                      <strong>Férias:</strong> {entry.title}
                    </div>
                  ))
              }
              {data && data.deliveries && Array.isArray(data.deliveries.entries) &&
                date && data.deliveries.entries.some((entry: any) => new Date(entry.date).toDateString() === date.toDateString()) && (
                  <div className="status-message" style={{ background: '#dbeafe', color: '#1e40af', marginBottom: 8 }}>
                    <strong>Entrega:</strong> {data.deliveries.entries.find((entry: any) => new Date(entry.date).toDateString() === date.toDateString())?.title}
                  </div>
              )}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
