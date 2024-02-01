import productService from "@/services/product-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await productService.getProductById(Number(params.id)));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedProduct = await productService.updatePartialProduct(Number(params.id), data);
  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await productService.deleteProduct(Number(params.id)));
}
