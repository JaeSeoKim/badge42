/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SvgContainer.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 23:11:26 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/20 02:11:35 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

interface Props {
  color: string;
  height: number;
}

const SvgContainer: React.FC<Props> = ({ color, children, height }) => {
  return (
    <svg
      width="495"
      height={height}
      viewBox={`0 0 495 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        rx="4.5"
        height="99%"
        stroke="#E4E2E2"
        width="494"
        fill={color}
        strokeOpacity="1"
        data-testid={'svg-container'}
      />
      {children}
    </svg>
  );
};

export default SvgContainer;
