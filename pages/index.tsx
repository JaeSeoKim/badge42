import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Badge42Logo from "../components/Badge42Logo";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const Home: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return (
      <Layout>
        <div className="flex flex-col justify-center min-h-screen gap-2">
          <div className="flex justify-center">
            <Loading />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center min-h-screen gap-2">
        <div className="flex justify-center">
          <Badge42Logo className="w-48 h-48 fill-black" />
        </div>
        <label>
          <p>session :</p>
          <pre className="whitespace-pre-wrap border border-neutral-600 rounded p-2">
            {JSON.stringify(session, null, 2)}
          </pre>
          <p>42-school :</p>
          <iframe
            src="/api/v2/42-school"
            className="w-full whitespace-pre-wrap border border-neutral-600 rounded p-2"
          ></iframe>
        </label>
      </div>
    </Layout>
  );
};

export default Home;
