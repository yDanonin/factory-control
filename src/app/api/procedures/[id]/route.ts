import procedureService from "@/services/procedure-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await procedureService.getProcedureById(Number(params.id)));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedProcedure = await procedureService.updatePartialProcedure(Number(params.id), data);
  return NextResponse.json(updatedProcedure);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await procedureService.deleteProcedure(Number(params.id)));
}
