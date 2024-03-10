import { NextRequest, NextResponse } from "next/server";
import { CommonAddressRequest } from "@/types/address.types";
import addressService from "@/services/address-service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = { ...body };

  return NextResponse.json(await addressService.createAddress(data));
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const page = params.get("page");
  const perPage = params.get("perPage");
  const cep = params.get("cep") || "";

  const filters = {
    page: page ? Number(page) : 1,
    perPage: perPage ? Number(perPage) : 10
  } as CommonAddressRequest;

  return NextResponse.json(await addressService.getAllAdresses({ ...filters, cep }));
}
