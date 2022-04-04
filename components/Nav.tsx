import Link from "next/link";
import { signOut } from "next-auth/react";
import React, { useContext } from "react";
import Badge42Logo from "./Badge42Logo";
import { AuthContext } from "../lib/auth/AuthProvider";

export type NavProps = {};

const Nav: React.FC<NavProps> = () => {
  const { data } = useContext(AuthContext);

  return (
    <header className="fixed z-10 top-0 border-b bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70 w-full shadow-sm">
      <div className="flex justify-between items-center mx-auto max-w-screen-sm w-full h-12 p-2">
        <Link href={"/"}>
          <a>
            <Badge42Logo className="w-10 h-10 fill-black" />
          </a>
        </Link>
        <div className="flex gap-2 font-bold text-neutral-700">
          {data && (
            <Link href={"/me"}>
              <a>{data.name}</a>
            </Link>
          )}
          {data ? (
            <button className="font-bold" onClick={() => signOut()}>
              SignOut
            </button>
          ) : (
            <Link href={"/auth/signin"}>
              <a>SignIn</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
