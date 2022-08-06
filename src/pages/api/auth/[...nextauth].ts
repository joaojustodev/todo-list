import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/?loggedin=true",
    error: "/?callbackError=true",
    signOut: "/?logout=true",
  },
  events: {
    async linkAccount(message) {
      console.log("EVENT LINK ACCOUNT");
      console.log(message);
    },
    async signIn(message) {
      console.log("EVENT SIGNIN");
      console.log(message);
    },

    async session(message) {
      console.log("EVENT SESSION");
      console.log(message);
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SIGN IN:");
      console.log("USER:", user);
      console.log("ACCOUNT:", account);
      console.log("PROFILE:", profile);

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

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};

export default NextAuth(nextAuthOptions);
