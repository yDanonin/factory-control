// import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: Record<"email" | "password", string>) {
        const { email, password } = credentials;
        // const tokenReceived = await axios.post(
        //   "/api/auth/login",
        //   {
        //     email,
        //     password
        //   },
        //   {
        //     headers: { "Content-Type": "application/json" },
        //     withCredentials: true
        //   }
        // );
        // console.log("test", jwt.decode(tokenReceived.data.token));
        // const user: User = jwt.decode(tokenReceived.data.token);
        // if (tokenReceived) {
        //   return tokenReceived;
        // }
        if (email === "jsmith@pontalti.com" && password === "teste1234") {
          return {
            name: "J Smith",
            email: "jsmith@pontalti.com"
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
  session: {
    strategy: "jwt"
  }
  // pages: {
  //   signIn: "/auth/signin",
  //   error: "/auth/signin"
  // }
});

export { handler as GET, handler as POST };
