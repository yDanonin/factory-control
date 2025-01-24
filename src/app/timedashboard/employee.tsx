"use client";
import React, { lazy, Suspense } from "react";

import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/Spinner";
import { EmployeeWorkHour } from "@/components/ClocksEmployee/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClocksEmployee = lazy(() =>
  import("@/components/ClocksEmployee/ClocksEmployee").then((module) => ({ default: module.default }))
);

export const Employee = ({ idUser }: { idUser: string | undefined }) => {
  const [time, setTime] = useState(moment());
  const [workHours, setWorkHours] = useState<EmployeeWorkHour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const hours = time.hours();
  const minutes = time.minutes();
  const seconds = time.seconds();

  useEffect(() => {
    console.log("entrou aq y times")
    console.log("isLoading", isLoading)
    const fetchWorkHours = async () => {
      const endDate = moment().format("YYYY-MM-DD");
      const startDate = moment().subtract(3, "months").format("YYYY-MM-DD");
      try {
        const response = await axios.get(`/api/employees/work-hours`, {
          params: {
            employee_id: idUser,
            startDate: startDate,
            endDate: endDate
          }
        });
        setWorkHours(response.data);
      } catch (error) {
        console.error("Error fetching work hours:", error);
      } finally {
        setIsLoading(false);
        console.log("isLoading", isLoading)
      }
    };

    fetchWorkHours();
  }, [idUser]);

  async function timeClick() {
    const res = await axios.post("/api/employees/work-hours", {});
    console.log(res);
  }
  return (
    <>
      {isLoading && (
        <div className="fullscreen-spinner">
          <Spinner visible={true} color="default" message="Loading Page..."/>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Seus pontos batidos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <ClocksEmployee data={workHours} id={idUser} />
              </Suspense>
            </CardContent>
          </Card>
          <Card className="h-1/3" x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Ponto Online</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="w-full flex justify-center gap-2">
                  <p className="text-2xl text-[#2563eb] font-bold">{hours}h</p>
                  <p className="text-2xl text-black font-bold">:</p>
                  <p className="text-2xl text-[#2563eb] font-bold">{minutes}m</p>
                  <p className="text-2xl text-black font-bold">:</p>
                  <p className="text-2xl text-[#2563eb] font-bold">{seconds}s</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="w-full flex justify-center">
                <Button className="w-3/4" variant="outline" onClick={() => timeClick()}>
                  Bater ponto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
