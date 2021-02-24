/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   loadImage.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/24 14:23:40 by jaeskim           #+#    #+#             */
/*   Updated: 2021/02/24 14:25:59 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from "fs";

export const loadImage = (
  path: string,
  defaultPath: string,
  type: string = "image/jpeg"
) => {
  const workingPath: string = fs.existsSync(path) ? path : defaultPath;
  return `data:${type};base64,${fs
    .readFileSync(workingPath)
    .toString("base64")}`;
};
