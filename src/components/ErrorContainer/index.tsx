/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 01:49:28 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/16 11:49:52 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import Message from "./Message";
import SvgContainer from "../SvgContainer";

const ErrorContainer: React.FC = () => {
  return (
    <SvgContainer color={"#FAFAFA"} height={195}>
      <Message />
    </SvgContainer>
  );
};

export default ErrorContainer;
