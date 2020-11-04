/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Logo.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:00:52 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/05 01:14:42 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Logo = ({ logo }) => {
  return (
    <g transform="translate(10, 1)">
      <svg width="34px" height="52px">
        <svg
          x="0px"
          y="0px"
          viewBox="0 0 68 104"
          style={{
            fill: "rgba(32, 32, 38, 0.35)",
          }}
        >
          <g>
            <g transform="translate(-96.000000, -60.000000)">
              <g transform="translate(96.000000, 60.000000)">
                <polygon points="0,0 0,80.5 34.3,104 68,80.5 68,0" />
              </g>
            </g>
          </g>
        </svg>
        <g transform="translate(2, 12)">
          <image
            className={"fadeIn"}
            x="0"
            y="0"
            width="30"
            height="30"
            href={logo}
          />
        </g>
      </svg>
    </g>
  );
};

export default Logo;
