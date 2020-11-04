/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SvgContainer.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 23:11:26 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/05 00:24:32 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

interface Props {
  color: string;
}

const SvgContainer: React.FC<Props> = ({ color, children }) => {
  return (
    <svg
      width="495"
      height="195"
      viewBox="0 0 495 195"
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
      />
      {children}
    </svg>
  );
};

export default SvgContainer;
