import { NextRequest, NextResponse } from "next/server";
import customerService from "@/services/customer-service";
import { CustomerRequest } from "@/types/customer.types";
import createHttpErrors from "http-errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = { ...body };

    return NextResponse.json(await customerService.createCustomer(data), { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const httpError = createHttpErrors(e);
    console.error(httpError);
    return NextResponse.json(httpError.message, { status: httpError.status, statusText: httpError.name });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const filters = {
    id: searchParams.get("id") ? Number(searchParams.get("id")) : undefined,
    name: searchParams.get("name") ?? undefined,
    status: searchParams.get("status") ? Number(searchParams.get("status")) : undefined,
    phone: searchParams.get("phone") ?? undefined,
    cel_number: searchParams.get("cel_number") ?? undefined,
    email: searchParams.get("email") ?? undefined,
    store_name: searchParams.get("store_name") ?? undefined,
    deliver: searchParams.get("deliver") ? Boolean(searchParams.get("deliver")) : undefined,
    pontalti: searchParams.get("pontalti") ? Boolean(searchParams.get("pontalti")) : undefined,
    secondary_line: searchParams.get("secondary_line") ? Boolean(searchParams.get("secondary_line")) : undefined,
    cpf: searchParams.get("cpf") ?? undefined,
    cnpj: searchParams.get("cnpj") ?? undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    perPage: searchParams.get("perPage") ? Number(searchParams.get("perPage")) : 10
  } as CustomerRequest;

  const res = NextResponse.json(await customerService.getAllCustomers(filters));

  return res;
}
