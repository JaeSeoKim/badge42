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
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    session: async ({ session, token, user }) => {
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/new-user",
  },
});
