/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/22 19:54:00 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 01:49:00 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

interface Props {
  name: string;
  campus: string;
  darkmode: boolean;
}

const Title: React.FC<Props> = ({ name, campus, darkmode }) => {
  return (
    <h1
      className={"fadeIn"}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginLeft: "15px",
        font: "600 18px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
        color: "#fff",
        animationDelay: "25ms",
      }}
      data-testid={"header"}
    >
      <span>{name}'s</span>
      <div
        style={{
          position: "relative",
          marginLeft: "5px",
          marginRight: "3px",
          top: "-2px",
        }}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="24px"
          height="24px"
          viewBox="0 -200 960 960"
          enableBackground="new 0 -200 960 960"
          xmlSpace="preserve"
          fill="#fff"
        >
          <polygon
            id="polygon5"
            points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1
	32,279.1 "
          />
          <polygon
            id="polygon7"
            points="597.9,114.2 762.7,-51.1 597.9,-51.1 "
          />
          <polygon
            id="polygon9"
            points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 "
          />
          <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
        </svg>
      </div>
      <span>{campus} Stats</span>
    </h1>
  );
};

export default Title;
