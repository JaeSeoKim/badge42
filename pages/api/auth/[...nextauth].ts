import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FortyTwoProvider from "next-auth/providers/42-school";
import { PrismaAdapter } from "../../../lib/auth/adapter";
import prisma from "../../../db";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      return true;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    session: async ({ session, token }) => {
      return session;
    },
    jwt: async ({ user, token, account, profile }) => {
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
    updateAge: 2 * 60 * 60, // 2 hours
  },
  pages: {
    signIn: "/auth/signin",
  },
});
