import React from "react";
import { css, keyframes, Global } from "@emotion/react";

export type ContainerProps = {
  color: string;
  cover_url: string;
  height: number;
};

const Container: React.FC<ContainerProps> = ({
  children,
  color,
  cover_url,
  height,
}) => {
  const fadeIn = keyframes`
    0% { opacity: 0 };
    100% { opacity: 1 };
  `;

  return (
    <svg
      width="500"
      height={height + 10}
      viewBox={`0 0 500 ${height + 10}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Global
        styles={css`
          .fadeIn {
            opacity: 0;
            animation: ${fadeIn} 0.5s ease-in-out;
            animation-fill-mode: forwards;
          }
        `}
      />
      <g id="panel" filter="url(#container_filter)">
        <rect x="5" y="5" width="490" height={height} rx="5" fill={color} />
        <rect
          x="5"
          y="5"
          width="490"
          height={height}
          rx="5"
          fill="url(#cover)"
        />
        <rect
          x="4.5"
          y="4.5"
          width="491"
          height={height + 1}
          rx="5.5"
          stroke="#E4E2E2"
        />
      </g>
      {children}
      <defs>
        <filter
          id="container_filter"
          x="4"
          y="4"
          width="496"
          height={height + 6}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_101_3"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_101_3"
            result="shape"
          />
        </filter>
        <filter
          id="filter_shadow"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect_dropShadow"
            result="shape"
          />
        </filter>
        <pattern
          id="cover"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#cover_image"
            transform="translate(0 -0.225329) scale(0.00078125 0.0020148)"
          />
        </pattern>
        <image id="cover_image" xlinkHref={cover_url} />
      </defs>
    </svg>
  );
};

export default Container;
