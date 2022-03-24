import React from "react";

export type InfomationProps = {
  data: [key: string, value: string][];
};

const Infomation = ({ data }: InfomationProps) => {
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
          <g filter="url(#shadow)">
            <text
              fill="black"
              fillOpacity="0.6"
              xmlSpace="preserve"
              style={{
                whiteSpace: "nowrap",
              }}
              fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="19" y={startY + i * distance + 2}>
                {key}
              </tspan>
            </text>
            <text
              fill="black"
              fillOpacity="0.6"
              xmlSpace="preserve"
              style={{
                whiteSpace: "nowrap",
              }}
              fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="65" y={startY + i * distance + 2}>
                -
              </tspan>
            </text>
            <text
              fill="black"
              fillOpacity="0.6"
              xmlSpace="preserve"
              style={{
                whiteSpace: "nowrap",
              }}
              fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="75" y={startY + i * distance + 2}>
                {value}
              </tspan>
            </text>
          </g>

          <text
            fill="white"
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
            fill="white"
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
            fill="white"
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
