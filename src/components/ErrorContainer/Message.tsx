/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Message.tsx                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:56:04 by jaeskim           #+#    #+#             */
/*   Updated: 2022/04/05 00:45:47 by jaeskim          ###   ########seoul.kr  */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Message: React.FC = () => {
  return (
    <g>
      <g transform="translate(247, 45)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          style={{
            font: "600 25px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
            fill: "#02BABC",
          }}
        >
          This EndPoint is deprecated!
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
          Login is required due to GDPR-related issues.
        </text>
        <text x="0" y="30">
          Please check and use the new service method.
        </text>
        <text x="0" y="60">
          <a
            href={"https://github.com/JaeSeoKim/badge42"}
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
