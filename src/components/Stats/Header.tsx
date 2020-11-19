/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:00:31 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/20 03:13:05 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

interface Props {
  name: string;
  cpusName: string;
  isPiscine: boolean;
}

const Header: React.FC<Props> = ({ name, cpusName, isPiscine }) => {
  const x = isPiscine ? 15 : 55;
  return (
    <g transform={`translate(${x}, 35)`}>
      <g transform="translate(0, 0)">
        <text
          className={"fadeIn"}
          x="0"
          y="0"
          style={{
            font:
              "600 18px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            fill: "#fff",
          }}
          data-testid={"header"}
        >
          {name}'s 42{cpusName} Stats
        </text>
      </g>
    </g>
  );
};

export default Header;
