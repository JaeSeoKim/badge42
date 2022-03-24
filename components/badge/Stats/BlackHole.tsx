import React from "react";

export type BlackHoleProps = {
  data: {
    begin_at: string;
    blackholed_at?: string | null;
    end_at?: string | null;
  };
};

const getRemainDay = (end: string) => {
  const startDate = new Date();
  const endDate = new Date(end);

  const Difference_In_Time = endDate.getTime() - startDate.getTime();

  return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
};

const getDayColor = (day: number) => {
  if (day >= 50) return "rgb(83, 210, 122)";
  if (day >= 30) return "rgb(223, 149, 57)";
  return "rgb(255,69,0)";
};

const BlackHole = ({ data }: BlackHoleProps) => {
  const reaminDay = getRemainDay(data.blackholed_at);

  if (data.blackholed_at && reaminDay < 0)
    return (
      <g
        dangerouslySetInnerHTML={{
          __html: "<!-- You've been absorbed by the Black Hole. -->",
        }}
      />
    );

  if (!data.blackholed_at) {
    return (
      <>
        <rect
          className="fadeIn"
          style={{
            animationDelay: `1.0s`,
          }}
          x="328"
          y="71"
          width="156"
          height="48"
          rx="5"
          fill="black"
          fillOpacity="0.4"
        />
        <g filter="url(#shadow)">
          <text
            fill="black"
            fillOpacity="0.6"
            xmlSpace="preserve"
            className="fadeIn"
            style={{
              animationDelay: `1.25s`,
              whiteSpace: "nowrap",
            }}
            fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
            fontSize="8"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="367.344" y="86">
              Period learned in 42!
            </tspan>
          </text>
        </g>
        <text
          fill="#ffc221"
          xmlSpace="preserve"
          className="fadeIn"
          style={{
            animationDelay: `1.25s`,
            whiteSpace: "nowrap",
          }}
          fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
          fontSize="8"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="365.344" y="84">
            Period learned in 42!
          </tspan>
        </text>
        <g filter="url(#shadow)">
          <text
            fill="black"
            fillOpacity="0.6"
            xmlSpace="preserve"
            className="fadeIn"
            style={{
              animationDelay: `1.5s`,
              whiteSpace: "nowrap",
            }}
            fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="351.916" y="106">
              {new Date(data.begin_at).toISOString().substring(0, 10)} ~{" "}
              {data.end_at &&
                new Date(data.end_at).toISOString().substring(0, 10)}{" "}
            </tspan>
          </text>
        </g>
        <text
          fill={`rgb(83, 210, 122)`}
          xmlSpace="preserve"
          className="fadeIn"
          style={{
            animationDelay: `1.5s`,
            whiteSpace: "nowrap",
          }}
          fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
          fontSize="10"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="349.916" y="104">
            {new Date(data.begin_at).toISOString().substring(0, 10)} ~{" "}
            {data.end_at &&
              new Date(data.end_at).toISOString().substring(0, 10)}{" "}
          </tspan>
        </text>
      </>
    );
  }

  return (
    <>
      <rect
        className="fadeIn"
        style={{
          animationDelay: `1.0s`,
        }}
        x="328"
        y="71"
        width="156"
        height="48"
        rx="5"
        fill="black"
        fillOpacity="0.4"
      />
      <g filter="url(#shadow)">
        <text
          fill="black"
          fillOpacity="0.6"
          xmlSpace="preserve"
          className="fadeIn"
          style={{
            animationDelay: `1.25s`,
            whiteSpace: "nowrap",
          }}
          fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
          fontSize="8"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="367.344" y="86">
            BlackHole absorption
          </tspan>
        </text>
      </g>
      <text
        fill="#ffc221"
        xmlSpace="preserve"
        className="fadeIn"
        style={{
          animationDelay: `1.25s`,
          whiteSpace: "nowrap",
        }}
        fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
        fontSize="8"
        fontWeight="bold"
        letterSpacing="0em"
      >
        <tspan x="365.344" y="84">
          BlackHole absorption
        </tspan>
      </text>
      <g filter="url(#shadow)">
        <text
          fill="black"
          fillOpacity="0.6"
          xmlSpace="preserve"
          className="fadeIn"
          style={{
            animationDelay: `1.5s`,
            whiteSpace: "nowrap",
          }}
          fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="351.916" y="110">
            {reaminDay <= 1 ? `few hour left!` : `${reaminDay} days left!`}
          </tspan>
        </text>
      </g>
      <text
        fill={getDayColor(reaminDay)}
        xmlSpace="preserve"
        className="fadeIn"
        style={{
          animationDelay: `1.5s`,
          whiteSpace: "nowrap",
        }}
        fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
        fontSize="18"
        fontWeight="bold"
        letterSpacing="0em"
      >
        <tspan x="349.916" y="108">
          {reaminDay <= 1 ? `few hour left!` : `${reaminDay} days left!`}
        </tspan>
      </text>
    </>
  );
};

export default BlackHole;
