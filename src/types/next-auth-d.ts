// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as jwtNextAuth from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    accessToken?: string;
    isAdmin?: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      idToken?: string;
      accessToken?: string;
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    idToken?: string;
    accessToken?: string;
    isAdmin?: boolean;
  }
}
