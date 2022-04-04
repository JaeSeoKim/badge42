import type { NextPage } from "next";
import LoginButtonGithub from "../../components/LoginButtonGithub";
import LoginButton42School from "../../components/LoginButton42School";
import { signIn, useSession } from "next-auth/react";
import Badge42Logo from "../../components/Badge42Logo";
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../lib/auth/AuthProvider";

export type SignInErrorTypes =
  | "Signin"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired"
  | "default";

const errors: Record<SignInErrorTypes, string> = {
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallback: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  default: "Unable to sign in.",
};

const SignInPage: NextPage = () => {
  const [callbackUrl, setCallBackUrl] = useState("/");
  const [error, setError] = useState(null);
  const { status } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);

    const callbackUrl = url.searchParams.get("callbackUrl");
    const error = url.searchParams.get("error");

    if (callbackUrl) setCallBackUrl(callbackUrl);
    setError(error);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center">
          <Link href={"/"}>
            <a>
              <Badge42Logo className="w-48 h-48 fill-black" />
            </a>
          </Link>
        </div>
        <h1 className="text-3xl font-bold">#Sign In</h1>
        <hr className="border-neutral-300" />
        {error && (
          <div className="border-2 border-red-300 bg-red-100 rounded p-2 text-base">
            {errors[error]}
          </div>
        )}
        <LoginButton42School
          onClick={() =>
            signIn("42-school", {
              callbackUrl: callbackUrl,
            })
          }
        />
        <LoginButtonGithub
          onClick={() =>
            signIn("github", {
              callbackUrl: callbackUrl,
            })
          }
        />
      </div>
    </Layout>
  );
};

export default SignInPage;
