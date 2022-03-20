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
  disable?: boolean;
};

const LoginButton = ({ provider, onClick, disable }: LoginButtonProps) => {
  const { name, background, color, logo: Logo } = provider;
  return (
    <div>
      <button
        style={{
          background: background,
          color: color,
        }}
        className={`w-full h-12 rounded text-xl flex gap-2 justify-center items-center disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={onClick}
        disabled={disable}
      >
        {Logo && <Logo fontSizeAdjust={"14px"} />}
        <p>
          {`Sign in with `}
          {name}
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
