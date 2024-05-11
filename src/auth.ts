import axios from "axios";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import { signInFormSchema } from "@/schemas/FormSchemas";
import Credentials from "next-auth/providers/credentials";

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      const { email, password } = await signInFormSchema.parseAsync(credentials);
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      };
      try {
        const tokenReceived = await axios.post(
          "http://localhost:3001/api/v1/auth/login",
          {
            email: email,
            password: password
          },
          {
            headers: headers
          }
        );
        const accessToken = tokenReceived.data.data.token;
        const user = await axios.post(
          "http://localhost:3001/api/v1/users/email/",
          {
            email: email
          },
          {
            headers: headers
          }
        );
        if (user.data && accessToken) {
          return { ...user.data, accessToken: accessToken };
        } else {
          return null;
        }
      } catch (e) {
        throw new Error("something went wrong");
      }
    }
  })
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: "jwttoken",
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async session({ session, token }) {
      session.user = {
        id: session.user.id,
        emailVerified: new Date(),
        idToken: token.idToken,
        name: session.user.name,
        email: session.user.email,
        isAdmin: token.isAdmin,
        accessToken: token.accessToken
      };
      return session;
    },
    async jwt({ token, user }) {
      // in console.log() the user returns undefined and I dont know why. But he actual returns the information from user, probably is an error from lib
      if (user) {
        token.idToken = user.id;
        token.accessToken = user.accessToken;
        token.isAdmin = user.isAdmin;
      }
      return token;
    }
  }
});
