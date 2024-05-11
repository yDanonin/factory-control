"use client";
import React from "react";
import { auth } from "@/auth";

// eslint-disable-next-line @next/next/no-async-client-component
const Register: React.FC = async () => {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
};

export default Register;
