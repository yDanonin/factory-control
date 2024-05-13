import { auth } from "@/auth";
import { NextRequest } from "next/server";

function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers);
  responseHeaders.delete("content-encoding");

  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers: responseHeaders
  });
}

async function handler(request: NextRequest) {
  const session = await auth();

  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${session?.user.accessToken}`);

  // change this later when in production
  const backendUrl = "http://localhost:3001";

  let url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl);
  url = url.replace("/api", "/api/v1");
  console.log("URL", url);
  const result = await fetch(url, { headers, body: request.body });

  return stripContentEncoding(result);
}

export const dynamic = "force-dynamic";
export { handler as GET, handler as POST };
