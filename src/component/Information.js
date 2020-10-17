/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Information.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:19:08 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/18 01:41:54 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const Information = ({ email, name, grade }) => {
  return (
    <g
      transform="translate(18, 80)"
      style={{
        font: "600 16px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
        fill: "#fff",
      }}
    >
      <text x="0" y="0">
        Grade
      </text>
      <text x="50" y="0">
        - {grade}
      </text>
      <text x="0" y="25">
        Name
      </text>
      <text x="50" y="25">
        - {name}
      </text>
      <text x="0" y="50">
        Email
      </text>
      <text x="50" y="50">
        - <a href={`mailto:${email}`}>{email}</a>
      </text>
    </g>
  );
};

export default Information;
