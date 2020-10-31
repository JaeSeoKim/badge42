/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getImageToBase64.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:16:35 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/31 20:34:42 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Axios from "axios";

const base64encode = (res) => {
  return `data:${res.headers["content-type"]};base64,${res.data.toString("base64")}`;
};

const getImageToBase64 = async (url) => {
  const response = await Axios.get(url, {
    responseType: "arraybuffer",
  });

  return base64encode(response);
};

export default getImageToBase64;