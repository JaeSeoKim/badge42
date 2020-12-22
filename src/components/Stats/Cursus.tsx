import React from "react";

interface Props {
  cursus: string;
}

const Cursus: React.FC<Props> = ({ cursus }) => {
  return (
    <h2
      className={"fadeIn"}
      style={{
        marginTop: "20px",
        marginLeft: "auto",
        font: "600 14px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
        color: "#fff",
        animationDelay: "50ms",
      }}
      data-testid={"cursus"}
    >
      {cursus}!
    </h2>
  );
};

export default Cursus;
