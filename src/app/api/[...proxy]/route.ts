import { auth } from "@/auth";
import axios, { AxiosHeaders } from "axios";
import { NextRequest } from "next/server";

// change this later when in production
const backendUrl = "http://localhost:3001";

function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers);
  responseHeaders.delete("content-encoding");

  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers: responseHeaders
  });
}

async function POST(request: NextRequest) {

  const session = await auth();
  
  let url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl);
  url = url.replace("/api", "/api/v1");
  
  const headers = new AxiosHeaders();
  headers.set("Authorization", `Bearer ${session?.user.accessToken}`);
  
  const body = await request.json()
  const res =  await fetch(url, { headers, body: body, method: "post" });
  
  return res
}

async function GET(request: NextRequest) {
  const session = await auth();
  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${session?.user.accessToken}`);

  let url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl);
  url = url.replace("/api", "/api/v1");
  console.log("URL", url);

  const result = await fetch(url, { headers });
  return stripContentEncoding(result);
}

export const dynamic = "force-dynamic";
export { GET, POST };
