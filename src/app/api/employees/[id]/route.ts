import employeeService from "@/services/employee-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await employeeService.getEmployeeById(Number(params.id)));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedEmployee = await employeeService.updatePartialEmployee(Number(params.id), data);
  return NextResponse.json(updatedEmployee);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await employeeService.deleteEmployee(Number(params.id)));
}
