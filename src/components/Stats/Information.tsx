import React from "react";

interface Props {
  grade: string;
  name: string;
  email: string | null;
}

const Container: React.FC<{
  title: string;
  value: string;
  animationDelay: string;
}> = ({ title, value, animationDelay }) => {
  return (
    <div
      className={"fadeIn"}
      style={{
        display: "flex",
        marginTop: "8px",
        font: "600 14px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
        color: "#FFF",
        animationDelay: animationDelay,
      }}
    >
      <h3 style={{ width: "50px" }}>{title}</h3>
      <h3>
        -{" "}
        <span data-testid={`information-${title.toLowerCase()}`}>{value}</span>
      </h3>
    </div>
  );
};

const Information: React.FC<Props> = ({ grade, name, email }) => {
  return (
    <div style={{ marginLeft: "8px", minHeight: "54px" }}>
      <Container title={"Grade"} value={grade} animationDelay={"75ms"} />
      {name && (
        <Container title={"Name"} value={name} animationDelay={"100ms"} />
      )}
      {email && (
        <Container title={"Email"} value={email} animationDelay={"125ms"} />
      )}
    </div>
  );
};

export default Information;
