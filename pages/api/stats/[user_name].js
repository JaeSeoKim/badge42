/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   [user_name].js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/16 12:35:10 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { get42User } from "../../../src/api/api42";
import renderMain from "../../../src/render/renderMain";

export default async (req, res) => {
  const {
    query: { user_name },
  } = req;

  const user_data = await get42User(user_name);

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  res.send(await renderMain(user_data));
};
