/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   calculateStringWidth.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 07:50:22 by jaeskim           #+#    #+#             */
/*   Updated: 2022/04/04 23:36:14 by jaeskim          ###   ########seoul.kr  */
/*                                                                            */
/* ************************************************************************** */

import pixelWidth from "string-pixel-width";

const calculateStringWidth = (str: string, fontsize: number) => {
  const size = pixelWidth(str, {
    font: "verdana",
    size: fontsize,
  });

  return parseInt(size.toFixed(0));
};

export default calculateStringWidth;
