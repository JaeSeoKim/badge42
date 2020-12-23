/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Logo.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/22 19:22:02 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 10:20:24 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

interface Props {
  logo: string;
  color: string;
  darkmode: boolean;
}

const Logo: React.FC<Props> = ({ logo, color, darkmode }) => {
  return (
    <svg width="34px" height="52px" xmlns="http://www.w3.org/2000/svg">
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 68 104"
        fill={darkmode ? color : color}
        fillOpacity={darkmode ? "0.3" : "0.7"}
      >
        <g>
          <g transform="translate(-96.000000, -60.000000)">
            <g transform="translate(96.000000, 60.000000)">
              <polygon points="0,0 0,80.5 34.3,104 68,80.5 68,0" />
            </g>
          </g>
        </g>
      </svg>
      <image
        className={"fadeIn"}
        x="2"
        y="12"
        width="30"
        height="30"
        href={logo}
        data-testid={"logo"}
      />
    </svg>
  );
};

export default Logo;
