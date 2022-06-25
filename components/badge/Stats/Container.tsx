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
      <g>
        <g filter="url(#container_shadow)">
          <rect x="4" y="5" width="492" height={height} rx="5" fill="black" fillOpacity="0.25" />
        </g>
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
          xlinkHref={cover_url}
          preserveAspectRatio="xMinYMid slice"
          clipPath="url(#container_clip)"
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
          id="container_shadow"
          x="0"
          y="-4"
          width="500"
          height="200"
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
            result="effect1_foregroundBlur_101_2"
          />
        </filter>
        <rect
          id="container_rect"
          x="5"
          y="5"
          width="490"
          height={height}
          rx="5"
        />
        <clipPath id="container_clip">
          <use xlinkHref="#container_rect" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Container;
