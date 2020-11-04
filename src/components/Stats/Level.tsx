/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Level.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 20:12:41 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/04 20:58:45 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Level = ({ level, color }: { level: number; color: string }) => {
  const level_percentage = parseFloat((level % 1).toFixed(2)) * 100;

  return (
    <g transform="translate(10, 150)">
      <svg width="474px" height="36px">
        <rect
          width="100%"
          height="100%"
          rx="4.5"
          fill="rgba(32,32,38,0.85)"
          opacity="0.75"
        />
        <rect
          width={`${level_percentage}%`}
          height="100%"
          rx="4.5"
          fill={"#fff"}
        />
        <rect
          width={`${level_percentage}%`}
          height="100%"
          rx="4.5"
          fill={color}
          opacity="0.7"
        />
        <text
          x="239"
          y="22"
          textAnchor="middle"
          style={{
            font:
              "600 14px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            fill: "#fff",
          }}
        >
          level {Math.floor(level)} - {level_percentage}%
        </text>
      </svg>
    </g>
  );
};

export default Level;
