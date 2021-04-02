/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Container.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/22 18:44:19 by jaeskim           #+#    #+#             */
/*   Updated: 2021/04/03 03:42:40 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Global, css } from "@emotion/core";
import React from "react";
import fs from "fs";

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
  let rgba = `0, 0, 0, ${darkmode ? "0.7" : "0.1"}`;
  if (backgroundImage == "url()") {
    backgroundImage = `url(data:image/jpeg;base64,${fs
      .readFileSync(`src/img/cover/none.jpg`)
      .toString("base64")})`;

    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
    darkmode = !darkmode;
    rgba = `${r}, ${g}, ${b}, 0.5`;
  }
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
              ? `linear-gradient(rgba(${rgba}), rgba(${rgba}) ), ${backgroundImage}`
              : `linear-gradient(rgba(${rgba}), rgba(${rgba}) ), ${backgroundImage}`,
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
