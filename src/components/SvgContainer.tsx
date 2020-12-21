/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SvgContainer.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 23:11:26 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/22 00:04:37 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { url } from "koa-router";
import React from "react";

interface Props {
  cover?: string;
  color: string;
  width: number;
  height: number;
}

const SvgContainer: React.FC<Props> = ({
  cover,
  color,
  children,
  width,
  height,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid={"svg-container"}
    >
      {cover ? (
        <svg
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99%"
          width={width - 1}
          patternContentUnits="objectBoundingBox"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <image
            x="0.5"
            y="0.5"
            rx="4.5"
            width={width - 1}
            height={"99%"}
            preserveAspectRatio="xMidYMid slice"
            xlinkHref={cover}
          />
        </svg>
      ) : (
        <rect
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99%"
          stroke="#E4E2E2"
          width={width - 1}
          fill={color}
          strokeOpacity="1"
        />
      )}
      {children}
    </svg>
  );
};

export default SvgContainer;
