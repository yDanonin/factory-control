import addressService from "@/services/address-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await addressService.getAddressById(Number(params.id)));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedAddress = await addressService.updatePartialAddress(Number(params.id), data);
  return NextResponse.json(updatedAddress);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await addressService.deleteAddress(Number(params.id)));
}
