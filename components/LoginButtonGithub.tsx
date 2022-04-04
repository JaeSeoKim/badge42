import { Github } from "@icons-pack/react-simple-icons";
import LoginButton from "./LoginButton";

export type LoginButtonGithubProps = { onClick: () => {}; disable?: boolean };

const LoginButtonGithub = ({ onClick, disable }: LoginButtonGithubProps) => (
  <LoginButton
    provider={{
      name: "GitHub",
      background: "#2b3137",
      color: "#ffffff",
      logo: Github,
    }}
    disable={disable}
    onClick={onClick}
  />
);

export default LoginButtonGithub;
