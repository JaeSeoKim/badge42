import { css, Global, keyframes } from "@emotion/react";
import React from "react";

export type LevelProps = {
  color: string;
  level: number;
  height: number;
};

const Level = ({ color, level, height }: LevelProps) => {
  const level_integer = Math.floor(level);
  const level_percentage = (parseFloat((level % 1).toFixed(2)) * 100).toFixed(
    0
  );

  const expandWidth = keyframes`
    0% { width: 0px; }
    100% { width: ${parseInt(level_percentage) * 4.7}px; }
  `;

  return (
    <>
      <Global
        styles={css`
          .progress_bar {
            width: 0;
            animation: ${expandWidth} 1s ease;
            animation-fill-mode: forwards;
          }
        `}
      />
      <rect
        className="fadeIn"
        style={{
          animationDelay: "1.25s",
        }}
        x="14"
        y={height - 40}
        width="470"
        height="35"
        rx="5"
        fill="black"
        fillOpacity="0.4"
      />
      <rect
        className={`progress_bar`}
        style={{
          animationDelay: "1.5s",
        }}
        x="14"
        y={height - 40}
        width="470"
        height="35"
        rx="5"
        fill={color}
      />
      <g filter="url(#shadow)">
        <text
          fill="black"
          fillOpacity="0.6"
          xmlSpace="preserve"
          className={`fadeIn`}
          style={{
            animationDelay: "1.5s",
            whiteSpace: "nowrap",
          }}
          fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
          fontSize="14"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="209" y={height - 16}>
            level {level_integer} - {level_percentage}%
          </tspan>
        </text>
      </g>
      <text
        fill="white"
        xmlSpace="preserve"
        className={`fadeIn`}
        style={{
          animationDelay: "1.5s",
          whiteSpace: "nowrap",
        }}
        fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
        fontSize="14"
        fontWeight="bold"
        letterSpacing="0em"
      >
        <tspan x="207" y={height - 18}>
          level {level_integer} - {level_percentage}%
        </tspan>
      </text>
    </>
  );
};

export default Level;
