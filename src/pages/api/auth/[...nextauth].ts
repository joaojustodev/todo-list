import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("SIGN IN:");
      console.log("USER:", user);
      console.log("ACCOUNT:", account);

      return true;
    },

    async jwt({ token, account }) {
      console.log("cai no jwt");
      console.log(`token: ${token}`);
      console.log("account:", account);

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("CAI NO SESSION:");
      console.log("SESSION:", session);
      console.log("TOKEN:", token);
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
