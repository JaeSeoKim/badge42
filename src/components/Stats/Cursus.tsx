/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Cursus.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:07:33 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/19 21:48:00 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Cursus = ({ cursusName }) => {
  return (
    <g data-testid="card-title" transform="translate(480, 35)">
      <g transform="translate(0, 0)">
        <text
          className={"fadeIn"}
          x="0"
          y="0"
          textAnchor="end"
          style={{
            animationDelay: "150ms",
            font:
              "600 14px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            fill: "#fff",
          }}
          data-testid={"cursus"}
        >
          {cursusName}!
        </text>
      </g>
    </g>
  );
};

export default Cursus;
