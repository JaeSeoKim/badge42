/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Message.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:56:04 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/19 00:58:31 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Message = () => {
  return (
    <g>
      <g transform="translate(247, 45)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          style={{
            font:
              "600 25px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            fill: "#02BABC",
          }}
        >
          Something went wrong!
        </text>
      </g>
      <g
        transform="translate(28, 100)"
        style={{
          font: "400 18px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
          fill: "#737378",
        }}
      >
        <text x="0" y="0">
          This service is beta.
        </text>
        <text x="0" y="30">
          Please leave the error as Github issue.
        </text>
        <text x="0" y="60">
          <a
            href={"https://github.com/JaeSeoKim/badge42/issues"}
            style={{
              fill: "#02BCBA",
            }}
          >
            https://github.com/JaeSeoKim/badge42
          </a>
        </text>
      </g>
    </g>
  );
};

export default Message;
