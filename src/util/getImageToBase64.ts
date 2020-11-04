/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getImageToBase64.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:16:35 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/04 20:41:45 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Axios, { AxiosResponse } from "axios";

const base64encode = (res: AxiosResponse) => {
  return `data:${res.headers["content-type"]};base64,${res.data.toString(
    "base64"
  )}`;
};

const getImageToBase64 = async (url: string) => {
  const response = await Axios.get(url, {
    responseType: "arraybuffer",
  });

  return base64encode(response);
};

export default getImageToBase64;
