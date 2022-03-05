import type { NextPage } from "next";
import LoginButtonGithub from "../../components/LoginButtonGithub";
import LoginButton42 from "../../components/LoginButton42School";
import { signIn } from "next-auth/react";
import Badge42Logo from "../../components/Badge42Logo";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const SignIn: NextPage = () => {
  const [callbackUrl, setCallBackUrl] = useState("/");

  useEffect(() => {
    const callbackUrl = new URL(window.location.href).searchParams.get(
      "callbackUrl"
    );
    if (callbackUrl) setCallBackUrl(callbackUrl);
  }, []);

  return (
    <Layout>
      <div className="flex justify-center mb-16">
        <Badge42Logo className="w-48 h-48 fill-black" />
      </div>
      <div className="flex flex-col gap-2">
        <LoginButton42
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

export default SignIn;
