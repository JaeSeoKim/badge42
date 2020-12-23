/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Container.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/22 18:44:19 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 12:23:00 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Global, css } from "@emotion/core";
import React from "react";

interface Props {
  width: number;
  height: number;
  darkmode: boolean;
  color: string;
  backgroundImage?: string;
}

const Container: React.FC<Props> = ({
  width,
  height,
  darkmode,
  color,
  backgroundImage,
  children,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      data-testid={"svg-container"}
    >
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <foreignObject x={0.5} y={0.5} height={height - 1} width={width - 1}>
        <div
          // @ts-ignore
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            boxSizing: "border-box",
            width: width - 1,
            height: height - 1,
            margin: 0,
            backgroundColor: color,
            backgroundImage: darkmode
              ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), ${backgroundImage}`
              : `linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0) ), ${backgroundImage}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: darkmode && "saturate(200%)",
            border: "1px",
            borderColor: "#E4E2E2",
            borderRadius: "4.5px",
          }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
};

export default Container;
