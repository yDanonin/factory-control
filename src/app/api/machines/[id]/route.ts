import machineService from "@/services/machine-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await machineService.getMachineById(Number(params.id)));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedMachine = await machineService.updatePartialMachine(Number(params.id), data);
  return NextResponse.json(updatedMachine);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await machineService.deleteMachine(Number(params.id)));
}
