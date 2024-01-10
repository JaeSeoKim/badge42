/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   calculateStringWidth.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <hello@jaeseokim.dev>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 07:50:22 by jaeskim           #+#    #+#             */
/*   Updated: 2024/01/10 20:22:58 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import pixelWidth from 'string-pixel-width'

const calculateStringWidth = (str: string, fontsize: number) => {
  const size = pixelWidth(str, {
    font: 'verdana',
    size: fontsize
  })

  return parseInt(size.toFixed(0))
}

export default calculateStringWidth
