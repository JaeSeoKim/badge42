/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:00:31 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/17 19:41:58 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Header = ({ name, cpusName }) => {
  return (
    <g transform="translate(55, 35)">
      <g transform="translate(0, 0)">
        <text
          x="0"
          y="0"
          style={{
            font:
              "600 18px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            fill: "#fff",
          }}
        >
          {name}'s 42{cpusName} Stats
        </text>
      </g>
    </g>
  );
};

export default Header;