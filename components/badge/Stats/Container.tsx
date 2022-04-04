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
          fill="black"
          fillOpacity="0.2"
        />
        <image
          x="5"
          y="5"
          width="490"
          height={height}
          rx="5"
          radius="5"
          xlinkHref={cover_url}
          preserveAspectRatio="xMinYMin slice"
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
          id="shadow"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_101_3"
          />
        </filter>
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
        {/* <pattern
          id="cover"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#cover_image" transform="scale(0.000333333 0.000859649)" />
        </pattern>
        <image id="cover_image" xlinkHref={cover_url} /> */}
      </defs>
    </svg>
  );
};

export default Container;
