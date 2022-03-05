import { FortyTwo } from "@icons-pack/react-simple-icons";
import LoginButton from "./LoginButton";

export type LoginButton42SchoolProps = { onClick: () => {} };

const LoginButton42School = ({ onClick }: LoginButton42SchoolProps) => (
  <LoginButton
    provider={{
      name: "42",
      background: "#00babc",
      color: "#ffffff",
      logo: FortyTwo,
    }}
    onClick={onClick}
  />
);

export default LoginButton42School;
