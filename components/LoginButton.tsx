import { Icon } from "@icons-pack/react-simple-icons";
import React from "react";

export type LoginButtonProps = {
  provider: {
    name: string;
    color: string;
    background: string;
    logo?: Icon;
  };
  onClick: () => {};
};

const LoginButton = ({ provider, onClick }: LoginButtonProps) => {
  const { name, background, color, logo: Logo } = provider;
  return (
    <div>
      <button
        style={{
          background: background,
          color: color,
        }}
        className={`w-full h-12 rounded text-xl flex gap-2 justify-center items-center`}
        onClick={onClick}
      >
        {Logo && <Logo fontSizeAdjust={"14px"} />}
        {`Sign in with ${name}`}
      </button>
    </div>
  );
};

export default LoginButton;
