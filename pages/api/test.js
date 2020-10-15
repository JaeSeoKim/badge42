/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/15 22:00:34 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  get42Token,
  get42UserCoalition,
  get42UserInfo,
  get42UserCrusus,
} from "../../src/api/api42";

export default async (req, res) => {
  const token = await get42Token();

  const user_name = "jaeskim";

  const userInfo = await get42UserInfo(user_name, token.access_token);

  // const userCoalition = await get42UserCoalition(user_name, access_token);

  const userCrusus = await get42UserCrusus(userInfo.id, token.access_token);

  res.send(userCrusus);
};
