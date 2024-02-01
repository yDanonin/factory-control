import vendorService from "@/services/vendor-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await vendorService.getVendorById(Number(params.id)));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedVendor = await vendorService.updatePartialVendor(Number(params.id), data);
  return NextResponse.json(updatedVendor);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await vendorService.deleteVendor(Number(params.id)));
}
