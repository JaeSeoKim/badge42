/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Level.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 20:12:41 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/20 02:10:34 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { css, keyframes, Global } from "@emotion/core";

interface Props {
  level: number;
  color: string;
  height: number;
}

const Level: React.FC<Props> = ({ level, color, height }) => {
  const level_percentage = (parseFloat((level % 1).toFixed(2)) * 100).toFixed(
    0
  );

  const expandWidth = keyframes`
    0% { width: 0; }
    100% { width: ${level_percentage}%; }
  `;

  return (
    <g transform={`translate(10, ${height - 45})`}>
      <Global
        styles={css`
          .progress_bar {
            width: 0;
            animation: ${expandWidth} 1s ease;
            animation-fill-mode: forwards;
          }
        `}
      />
      <svg width="474px" height="36px">
        <rect
          width="100%"
          height="100%"
          rx="4.5"
          fill="rgba(32,32,38,0.85)"
          opacity="0.75"
        />
        <rect
          style={{ animationDelay: "650ms" }}
          className={"progress_bar"}
          width={`${level_percentage}%`}
          height="100%"
          rx="4.5"
          fill={color}
          opacity="0.8"
        />
        <text
          className={"fadeIn"}
          x="239"
          y="22"
          textAnchor="middle"
          style={{
            animationDelay: "650ms",
            font:
              "600 14px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            fill: "#fff",
          }}
          data-testid={'level'}
        >
          level {Math.floor(level)} - {level_percentage}%
        </text>
      </svg>
    </g>
  );
};

export default Level;
