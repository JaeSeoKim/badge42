import React from "react";

export type InfomationProps = {
  fg: string;
  data: [key: string, value: string][];
};

const Infomation = ({ fg, data }: InfomationProps) => {
  const startY = 83.83;
  const startDelay = 0.5;
  const distance = 24;

  return (
    <>
      {data.map(([key, value], i) => (
        <g
          key={`${key}-${value}`}
          className="fadeIn"
          style={{
            animationDelay: `${startDelay + i * 0.25}s`,
          }}
        >
          <text
            fill={fg}
            xmlSpace="preserve"
            style={{
              whiteSpace: "nowrap",
            }}
            fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="17" y={startY + i * distance}>
              {key}
            </tspan>
          </text>
          <text
            fill={fg}
            xmlSpace="preserve"
            style={{
              whiteSpace: "nowrap",
            }}
            fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="63" y={startY + i * distance}>
              -
            </tspan>
          </text>
          <text
            fill={fg}
            xmlSpace="preserve"
            style={{
              whiteSpace: "nowrap",
            }}
            fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="73" y={startY + i * distance}>
              {value}
            </tspan>
          </text>
        </g>
      ))}
    </>
  );
};

export default Infomation;
