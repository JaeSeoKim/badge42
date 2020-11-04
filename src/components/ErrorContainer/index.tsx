/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:49:28 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/05 00:24:40 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import Message from "./Message";
import SvgContainer from "../SvgContainer";

const ErrorContainer: React.FC = () => {
  return (
    <SvgContainer color={"#FAFAFA"}>
      <Message />
    </SvgContainer>
  );
};

export default ErrorContainer;
