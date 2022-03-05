import type { NextPage } from "next";
import Link from "next/link";
import Badge42Logo from "../components/Badge42Logo";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center mb-16">
        <Badge42Logo className="w-48 h-48 fill-black" />
      </div>
      <div className="flex justify-center gap-1">
        <Link href={"/auth/signin"}>
          <a className="flex justify-center items-center w-full h-12 bg-cyan-500 text-white text-2xl">
            SignIn
          </a>
        </Link>
        <Link href={"/me"}>
          <a className="flex justify-center items-center w-full h-12 bg-cyan-500 text-white text-2xl">
            Me
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
