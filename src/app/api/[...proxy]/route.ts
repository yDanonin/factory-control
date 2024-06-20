import { auth } from "@/auth";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const session = await auth();
  const headers = {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Authorization: `Bearer ${session?.user.accessToken}`
  };

  let url = req.nextUrl.href.replace(req.nextUrl.origin, "http://localhost:3001");
  url = url.replace("api", "api/v1");

  switch (req.method) {
    case "GET":
      try {
        const response = await axios.get(url, { headers: headers });
        return NextResponse.json(response.data, {
          status: response.status || 200,
          statusText: response.statusText,
          headers: headers
        });
      } catch (err) {
        const error = err as AxiosError;
        return NextResponse.json(error.response?.data || "", {
          status: error.response?.status,
          statusText: error.response?.statusText
        });
      }
    case "POST":
      try {
        const bodyNotParsed = await req.json();
        const response = await axios.post(url, bodyNotParsed, { headers: headers });
        return NextResponse.json(response.data, {
          status: response.status || 200,
          statusText: response.statusText,
          headers: headers
        });
      } catch (err) {
        const error = err as AxiosError;
        return NextResponse.json(error.response?.data || "", {
          status: error.response?.status,
          statusText: error.response?.statusText
        });
      }
    case "PATCH":
      try {
        const bodyNotParsed = await req.json();
        const response = await axios.patch(url, bodyNotParsed, { headers: headers });
        return NextResponse.json(response.data, {
          status: response.status || 200,
          statusText: response.statusText,
          headers: headers
        });
      } catch (err) {
        const error = err as AxiosError;
        return NextResponse.json(error.response?.data || "", {
          status: error.response?.status,
          statusText: error.response?.statusText
        });
      }
    case "DELETE":
      try {
        const response = await axios.delete(url, { headers: headers });
        return NextResponse.json(response.data, {
          status: response.status || 200,
          statusText: response.statusText,
          headers: headers
        });
      } catch (err) {
        const error = err as AxiosError;
        return NextResponse.json(error.response?.data || "", {
          status: error.response?.status,
          statusText: error.response?.statusText
        });
      }
  }
};

export const dynamic = "force-dynamic";

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
