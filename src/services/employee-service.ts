import { Classification, Employee } from "@/types/employee.types";
import { CommonRequest } from "@/types/common.types";
import repository from "@/repository/employee";

const handleEmployee = (e: Employee | Employee[]) => {
  if (Array.isArray(e)) {
    const response = e.map((data: Employee) => {
      const { classification, ...employee } = data;
      return { ...employee, status: Classification[classification] };
    });
    return response;
  }

  const { classification, ...employee } = e;
  return { ...employee, status: Classification[classification] };
};

const createEmployee = async (data: Employee) => {
  return handleEmployee((await repository.createEmployee(data)) as Employee);
};

const getAllEmployees = async (filters: CommonRequest) => {
  return handleEmployee((await repository.getEmployees(filters)) as Employee[]);
};

const getEmployeeById = async (id: number) => {
  return handleEmployee((await repository.getEmployee(id)) as Employee);
};

const updatePartialEmployee = async (id: number, data: unknown) => {
  return handleEmployee((await repository.updatePartialEmployee(id, data)) as Employee);
};

const deleteEmployee = async (id: number) => {
  return handleEmployee((await repository.deleteEmployee(id)) as Employee);
};

export default {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updatePartialEmployee,
  deleteEmployee
};
