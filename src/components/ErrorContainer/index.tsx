/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:49:28 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/22 18:03:48 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import Message from "./Message";
import SvgContainer from "../SvgContainer";
import calculateStringWidth from "../../util/calculateStringWidth";

interface Props {
  smallBadge: boolean;
  message: string | null;
}

const ErrorContainer: React.FC<Props> = ({ smallBadge, message }) => {
  if (smallBadge)
    return (
      <SvgContainer
        color={"#FAFAFA"}
        width={calculateStringWidth(message, 11) + 20}
        height={28}
      >
        <g transform={`translate(10, 19)`}>
          <text
            fill="#02BABC"
            textAnchor="start"
            fontFamily="Verdana,DejaVu Sans,sans-serif"
            fontStyle="italic"
            fontSize="11"
            textLength={calculateStringWidth(message, 11)}
          >
            {message}
          </text>
        </g>
      </SvgContainer>
    );
  return (
    <SvgContainer color={"#FAFAFA"} width={495} height={195}>
      <Message />
    </SvgContainer>
  );
};

export default ErrorContainer;
