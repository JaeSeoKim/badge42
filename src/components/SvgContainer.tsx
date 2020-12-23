/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SvgContainer.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 23:11:26 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 09:14:33 by jaeskim          ###   ########.fr       */
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
      xmlns="http://www.w3.org/2000/svg"
      data-testid={"svg-container"}
    >
      {cover ? (
        <foreignObject width={"100%"} height={"100%"}>
          <div
            // @ts-ignore
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              fontWeight: "bold",
              boxSizing: "border-box",
              padding: 20,
              width: width,
              height: height,
              borderRadius: 10,

              backgroundColor: "white",
              backgroundImage: `url(${cover})`,
              backgroundSize: "cover",
            }}
          >
            <h1>test</h1>
          </div>
        </foreignObject>
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
