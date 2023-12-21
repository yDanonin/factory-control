import customerService from "@/services/customer-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await customerService.getCustomerById(Number(params.id)))
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updatedCustomer = await customerService.updatePartialCustomer(Number(params.id), data);
  return NextResponse.json(updatedCustomer);
}

export async function DELETE(req: Request, { params }: { params: { id: string }}){
  return NextResponse.json(await customerService.deleteCustomer(Number(params.id)))
}
