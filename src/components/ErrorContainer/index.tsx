/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:49:28 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/04 18:27:53 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import Message from "./Message";

const ErrorContainer: React.FC = () => {
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
        fill={"#FAFAFA"}
        strokeOpacity="1"
      />
      <Message />
    </svg>
  );
};

export default ErrorContainer;
