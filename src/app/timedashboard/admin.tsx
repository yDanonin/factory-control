import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ClipboardList, Users } from "lucide-react";
import Spinner from "@/components/Spinner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ClockActiveEmployees from "@/components/ClockActiveEmployees/ClockActiveEmployees";
import { WorkHour } from "@/types/work-types.types";
import { TimeAdjustmentRequest } from "@/types/time-adjustment-request.types";
import { AdminPendingRequestsTable } from "./components/AdminPendingRequestsTable";

// const today = moment().format("YYYY-MM-DD");

export const Admin = () => {
  const [qtdFuncionario, setQtdFuncionario] = useState(0);
  const [qtdEmployeeActive, setQtdEmployeeActive] = useState(0);
  const [data, setData] = useState([]);
  const [pendingRequests, setPendingRequests] = useState<TimeAdjustmentRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPendingRequests = useCallback(async () => {
    try {
      const response = await axios.get("/api/time-adjustment-requests/pending");
      setPendingRequests(response.data);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/api/employees/work-hours/today");
        const data = resp.data.map((workHour: WorkHour) => {
          return { name: workHour.employee.name, cpf: workHour.employee.cpf, primeiroPonto: workHour.clock_in}
        })
        const resp2 = await axios.get("/api/employees");
        setQtdFuncionario(resp2.data.data.length)
        setQtdEmployeeActive(data.length)
        setData(data)
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  return (
    <>
      {isLoading && (
        <div className="fullscreen-spinner">
          <Spinner visible={true} color="default" message="Loading Page..."/>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader>
              <Users className="h-7 w-7 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium">Total da Qtd de Funcionário</CardTitle>
            </CardContent>
            <CardFooter>
              {/* <p className="text-2xl font-bold">{qtdFuncionario}</p> */}
              <p className="text-2xl font-bold">{qtdFuncionario}</p>
            </CardFooter>
          </Card>

          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader>
              <Users className="h-7 w-7 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#16a34a]"></div>
                <CardTitle className="text-sm font-medium">Total de Ativos Agora</CardTitle>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-2xl font-bold">{qtdEmployeeActive}</p>
            </CardFooter>
          </Card>

          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader>
              <ClipboardList className="h-7 w-7 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#eab308]"></div>
                <CardTitle className="text-sm font-medium">Solicitações Pendentes</CardTitle>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-2xl font-bold">{pendingRequests.length}</p>
            </CardFooter>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Funcionarios Ativos Agora</CardTitle>
                <CardDescription>Funcionários que bateram o ponto hoje</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ClockActiveEmployees
                data={data}
              />
            </CardContent>
          </Card>
        </div>

        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Solicitações de Ajuste de Horas</CardTitle>
              <CardDescription>Revise e aprove ou rejeite as solicitações dos funcionários</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <AdminPendingRequestsTable
              data={pendingRequests}
              onRefresh={fetchPendingRequests}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
