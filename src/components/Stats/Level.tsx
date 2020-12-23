/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Level.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/22 21:18:25 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 10:29:50 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { css, Global, keyframes } from "@emotion/core";
import React from "react";

interface Props {
  darkmode: boolean;
  color: string;
  level: number;
}

const Level: React.FC<Props> = ({ darkmode, level, color }) => {
  const level_percentage = (parseFloat((level % 1).toFixed(2)) * 100).toFixed(
    0
  );

  const expandWidth = keyframes`
    0% { width: 0; }
    100% { width: ${level_percentage}%; }
  `;
  return (
    <div style={{ marginTop: "10px", width: "100%", height: "36px" }}>
      <Global
        styles={css`
          .progress_bar {
            width: 0;
            animation: ${expandWidth} 1s ease;
            animation-fill-mode: forwards;
          }
        `}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "4.5px",
          backgroundColor: "rgba(32,32,38,0.7)",
        }}
      >
        <div
          className={`progress_bar`}
          style={{
            width: `${level_percentage}%`,
            height: "100%",
            borderRadius: "4.5px",
            backgroundColor: color,
            opacity: darkmode && "0.3",
          }}
        />
        <p
          className={"fadeIn"}
          style={{
            position: "relative",
            font:
              "600 14px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            color: "#ffffff",
            textAlign: "center",
            top: "-26px",
            animationDelay: "150ms",
          }}
          data-testid={"level"}
        >
          level {Math.floor(level)} - {level_percentage}%
        </p>
      </div>
    </div>
  );
};

export default Level;
