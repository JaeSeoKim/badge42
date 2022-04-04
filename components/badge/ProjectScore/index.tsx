/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 03:04:45 by jaeskim           #+#    #+#             */
/*   Updated: 2022/04/04 23:36:50 by jaeskim          ###   ########seoul.kr  */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { ProjectUser } from "../../../lib/api/42api";
import calculateStringWidth from "../../../lib/calculateStringWidth";
import Icon from "./Icon";

const ICONSWIDTH = 300;
const PADDING = 50;

interface Props {
  data: ProjectUser;
}

const ProjectScore: React.FC<Props> = ({ data }) => {
  const type =
    data["validated?"] != null
      ? data["validated?"] == true
        ? "Success"
        : "Fail"
      : "Subscribed";

  const color =
    data["validated?"] != null
      ? data["validated?"] == true
        ? "#5CB95B"
        : "#D7636F"
      : "#00BABB";

  const width =
    ICONSWIDTH +
    PADDING * 2 +
    calculateStringWidth(type, 120) +
    (data["validated?"] != null &&
      calculateStringWidth(data.final_mark.toString(), 200) +
        calculateStringWidth("/100", 80));

  return (
    <svg
      width={(width / 10).toFixed(0)}
      height="28"
      viewBox={`0 0 ${width} 280`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height="280" rx="1" fill={color} />
      <Icon type={type} />
      <g
        fill="#fff"
        textAnchor="start"
        fontFamily="Verdana,DejaVu Sans,sans-serif"
        fontSize="120"
      >
        <text
          x={ICONSWIDTH}
          y="200"
          textLength={calculateStringWidth(type, 120)}
          data-testid={"type"}
        >
          {type}
        </text>
      </g>
      {data["validated?"] != null && (
        <>
          <g
            fill="#fff"
            textAnchor="start"
            fontFamily="Verdana,DejaVu Sans,sans-serif"
            fontSize="200"
            fontStyle="italic"
          >
            <text
              x={ICONSWIDTH + calculateStringWidth(type, 120) + PADDING}
              y="210"
              textLength={calculateStringWidth(data.final_mark.toString(), 200)}
              data-testid={"final_mark"}
            >
              {data.final_mark.toString()}
            </text>
          </g>
          <g
            fill="#fff"
            textAnchor="start"
            fontFamily="Verdana,DejaVu Sans,sans-serif"
            fontSize="80"
          >
            <text
              x={
                ICONSWIDTH +
                calculateStringWidth(type, 120) +
                PADDING +
                calculateStringWidth(data.final_mark.toString(), 200)
              }
              y="210"
              textLength={calculateStringWidth("/100", 80)}
            >
              /100
            </text>
          </g>
        </>
      )}
    </svg>
  );
};

export default ProjectScore;
