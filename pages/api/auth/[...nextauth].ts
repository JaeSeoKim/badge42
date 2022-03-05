import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FortyTwoProvider from "next-auth/providers/42-school";

export default NextAuth({
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
  },
  pages: {
    signIn: "/auth/signin",
  },
});
