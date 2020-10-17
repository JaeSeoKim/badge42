/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Blackhole.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:13:40 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/17 19:17:09 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Blackhole = ({ blackholeRemain }) => {
  return (
    <g transform="translate(35, 150)">
      <g transform="translate(0, 0)">
        <text
          x="0"
          y="0"
          style={{
            font: "600 14px 'Arial', 'Segoe UI', Ubuntu, Sans-Serif",
            fill: "#fff",
          }}
        >
          {blackholeRemain} days left!
        </text>
      </g>
    </g>
  );
};

export default Blackhole;
