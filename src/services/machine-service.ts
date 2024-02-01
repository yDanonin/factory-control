import { Machine } from "@/types/machine.types";
import { Status, CommonRequest } from "@/types/common.types";
import repository from "@/repository/machine";

const handleMachine = (e: Machine | Machine[]) => {
  if (Array.isArray(e)) {
    const response = e.map((data: Machine) => {
      const { status, ...machine } = data;
      return { ...machine, status: Status[status] };
    });
    return response;
  }

  const { status, ...machine } = e;
  return { ...machine, status: Status[status] };
};

const createMachine = async (data: Machine) => {
  return handleMachine((await repository.createMachine(data)) as Machine);
};

const getAllMachines = async (filters: CommonRequest) => {
  return handleMachine((await repository.getMachines(filters)) as Machine[]);
};

const getMachineById = async (id: number) => {
  return handleMachine((await repository.getMachine(id)) as Machine);
};

const updatePartialMachine = async (id: number, data: unknown) => {
  return handleMachine((await repository.updatePartialMachine(id, data)) as Machine);
};

const deleteMachine = async (id: number) => {
  return handleMachine((await repository.deleteMachine(id)) as Machine);
};

export default {
  createMachine,
  getMachineById,
  getAllMachines,
  updatePartialMachine,
  deleteMachine
};
