import { signIn, signOut } from "next-auth/react";
import Layout from "../components/Layout";
import collection from "lodash-es/collection";
import LoginButtonGithub from "../components/LoginButtonGithub";
import LoginButton42School from "../components/LoginButton42School";
import { useState } from "react";
import axios from "axios";
import { AuthContext, withAuth } from "../lib/auth/AuthProvider";
import { useContext } from "react";
import Link from "next/link";

const NewUserPage = () => {
  const {
    data: { accounts, email, name },
  } = useContext(AuthContext);
  const accountsObj = collection.keyBy(accounts, "provider");

  return (
    <Layout>
      <h1 className="text-2xl font-bold">#Profile</h1>
      <hr className="border-neutral-300" />
      <div className="flex flex-col gap-2 font-bold">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
      <hr className="border-neutral-300" />
      <h2 className="text-xl font-bold">#Account Connect</h2>
      <hr className="border-neutral-300" />
      <label>
        <p className="text-neutral-600 font-bold">
          * In order to use the service, it is essential to link with 42-school.
        </p>
        <LoginButton42School
          disable={!!accountsObj["42-school"]}
          onClick={() => signIn("42-school")}
        />
      </label>
      <label>
        <p className="text-neutral-600">
          * Even when anonymous on 42Intra, GitHub connection is required to use
          this service.
        </p>
        <LoginButtonGithub
          disable={!!accountsObj["github"]}
          onClick={() => signIn("github")}
        />
      </label>
      <h2 className="text-xl font-bold text-red-600">#Danger Zone</h2>
      <hr className="border-neutral-300" />
      <label>
        <p className="text-neutral-600 font-bold">
          * This operation cannot be canceled.
        </p>
        <DeleteUser />
      </label>
      <hr className="border-neutral-300" />
      <Link href={"/"}>
        <a>
          <p>← Return Edit Badge Page</p>
        </a>
      </Link>
    </Layout>
  );
};

const DeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    if (confirm("* This operation cannot be canceled. Are you sure?")) {
      setIsLoading(true);
      try {
        await axios.delete("/api/v2/me", {
          withCredentials: true,
        });
        alert("Delete User Success.");
        signOut();
      } catch (error) {
        alert("Delete User Fail...");
      }
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`w-full h-12 rounded text-xl flex gap-2 justify-center items-center bg-red-600 text-white disabled:opacity-75 disabled:cursor-not-allowed`}
      disabled={isLoading}
      onClick={handleOnClick}
    >
      <p>{`Delete User`}</p>
    </button>
  );
};

export default withAuth(NewUserPage);
