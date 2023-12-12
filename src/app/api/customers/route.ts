import { NextRequest, NextResponse } from "next/server";
import customerService from "@/services/customer-service";

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = { ...body }

  return NextResponse.json(await customerService.createCustomer(data));
}
