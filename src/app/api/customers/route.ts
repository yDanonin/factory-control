import { NextRequest, NextResponse } from "next/server";
import { CustomerRequest } from "@/types/customer.types";
import customerService from "@/services/customer-service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = { ...body };

  return NextResponse.json(await customerService.createCustomer(data));
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const page = params.get("page");
  const perPage = params.get("perPage");

  const auctionRequest = {
    page: page ? Number(page) : 1,
    perPage: perPage ? Number(perPage) : 10
  } as CustomerRequest;

  return NextResponse.json(await customerService.getAllCustomers(auctionRequest));
}
