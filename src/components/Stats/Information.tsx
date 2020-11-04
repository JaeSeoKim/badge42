/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Information.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:19:08 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/05 01:38:36 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Information = ({ email, name, grade }) => {
  const subtitle = {
    font: "600 16px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
  };

  return (
    <g
      transform="translate(18, 80)"
      style={{
        font: "400 16px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
        fill: "#fff",
      }}
    >
      <text
        x="0"
        y="0"
        className={"fadeIn"}
        style={{ ...subtitle, animationDelay: "250ms" }}
      >
        Grade
      </text>
      <text
        x="50"
        y="0"
        className={"fadeIn"}
        style={{ ...subtitle, animationDelay: "250ms" }}
      >
        - {grade}
      </text>
      <text
        x="0"
        y="25"
        className={"fadeIn"}
        style={{ ...subtitle, animationDelay: "350ms" }}
      >
        Name
      </text>
      <text
        x="50"
        y="25"
        className={"fadeIn"}
        style={{ ...subtitle, animationDelay: "350ms" }}
      >
        - {name}
      </text>
      <text
        x="0"
        y="50"
        className={"fadeIn"}
        style={{ ...subtitle, animationDelay: "450ms" }}
      >
        Email
      </text>
      <text
        x="50"
        y="50"
        className={"fadeIn"}
        style={{ ...subtitle, animationDelay: "450ms" }}
      >
        - <a href={`mailto:${email}`}>{email}</a>
      </text>
    </g>
  );
};

export default Information;
