import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import prisma from "../../../db";
import collection from "lodash-es/collection";
import Badge42Logo from "../../../components/Badge42Logo";
import LoginButtonGithub from "../../../components/LoginButtonGithub";
import LoginButton42School from "../../../components/LoginButton42School";
import Link from "next/link";

const NewUserPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ accounts }) => {
  const { data: session } = useSession();
  const [callbackUrl, setCallBackUrl] = useState("/");

  const accountsObj = collection.keyBy(accounts, "provider");

  useEffect(() => {
    const url = new URL(window.location.href);

    const callbackUrl = url.searchParams.get("callbackUrl");

    if (callbackUrl) setCallBackUrl(callbackUrl);
  }, []);

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
        <h1 className="text-3xl font-bold"># Account Connect</h1>
        <hr className="border-neutral-300" />
        <label>
          <p className="text-neutral-600 font-bold">
            * In order to use the service, it is essential to link with
            42-school.
          </p>
          <LoginButton42School
            disable={!!accountsObj["42-school"]}
            onClick={() =>
              signIn("42-school", {
                callbackUrl: callbackUrl,
              })
            }
          />
        </label>
        <label>
          <p className="text-neutral-600">
            * Even when anonymous on 42Intra, GitHub connection is required to
            use this service.
          </p>
          <LoginButtonGithub
            disable={!!accountsObj["github"]}
            onClick={() =>
              signIn("github", {
                callbackUrl: callbackUrl,
              })
            }
          />
        </label>
        <div>
          <Link href={callbackUrl}>
            <a className="text-base text-neutral-600">Return To Back</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NewUserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      accounts: true,
    },
    rejectOnNotFound: true,
  });

  return {
    props: {
      session: session,
      accounts: user.accounts,
    },
  };
}
