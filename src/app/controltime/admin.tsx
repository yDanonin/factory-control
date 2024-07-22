// import axios from "axios";
// import moment from "moment";
// import Link from "next/link";
import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Employee } from "@/types/employee.types";
import { ArrowUpRight, Users } from "lucide-react";
// import { EmployeeWorkHour } from "@/components/ClocksEmployee/columns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ClockActiveEmployees from "@/components/ClockActiveEmployees/ClockActiveEmployees";

// const today = moment().format("YYYY-MM-DD");

export const Admin = () => {
  const [qtdFuncionario, setQtdFuncionario] = useState(0);
  // const [employeesWorkHours, setEmployeesWorkHours] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const employeesResponse = await axios.get("/api/employees");
    //     const employees = employeesResponse.data.data;

    //     setQtdFuncionario(employees.length);

    //     const onlyIdEmployees = employees.map((employee: Employee) => employee.id);
    //     console.log(onlyIdEmployees);

    //     const workHoursPromises = onlyIdEmployees.map((employeeId: { id: number }) => {
    //       console.log("entrou");
    //       return axios.get(`/api/employees/work-hours`, {
    //         params: {
    //           employee_id: employeeId,
    //           startDate: today,
    //           endDate: today
    //         }
    //       });
    //     });

    //     const workHoursResponses = await Promise.all(workHoursPromises);
    //     console.log(workHoursResponses);
    //     const allEmployeesWorkHours = workHoursResponses.map((response) => response.data);
    //     setEmployeesWorkHours(allEmployeesWorkHours);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // fetchData();
  }, []);

  return (
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
            <p className="text-2xl font-bold">7</p>
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
            <p className="text-2xl font-bold">7</p>
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
            <ClockActiveEmployees />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
