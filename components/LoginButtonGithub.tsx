import { Github } from "@icons-pack/react-simple-icons";
import LoginButton from "./LoginButton";

export type LoginButtonGithubProps = { onClick: () => {} };

const LoginButtonGithub = ({ onClick }: LoginButtonGithubProps) => (
  <LoginButton
    provider={{
      name: "GitHub",
      background: "#2b3137",
      color: "#ffffff",
      logo: Github,
    }}
    onClick={onClick}
  />
);

export default LoginButtonGithub;
