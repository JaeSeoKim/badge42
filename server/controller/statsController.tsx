/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   statsController.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/04 21:10:59 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Middleware } from "koa";
import React from "react";
import ReactDomServer from "react-dom/server";
import { get42User } from "../../src/api/api42";
import Stats from "../../src/components/Stats";
import getImageToBase64 from "../../src/util/getImageToBase64";
import ErrorContainer from "../../src/components/ErrorContainer";

const EXPIRE_TIME = 43200;

export const getUserStats: Middleware = async (ctx, next) => {
  const {
    params: { intraId },
    cacheStore,
  } = ctx;

  const ExpiresDate = new Date();
  ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);

  ctx.res.setHeader("Content-Type", "image/svg+xml");
  ctx.res.setHeader(
    "Cache-Control",
    `public, max-age=${EXPIRE_TIME}, stale-while-revalidate`
  );
  ctx.res.setHeader("Expires", ExpiresDate.toISOString());

  try {
    let logo = "";
    const user_data = await get42User(intraId, cacheStore);
    if (cacheStore.has(user_data.image_url))
      logo = cacheStore.get(user_data.image_url);
    else {
      logo = await getImageToBase64(user_data.image_url);
      // Cache 5day!
      cacheStore.set(user_data.image_url, logo, 86400 * 14);
    }
    // Sample Data
    // const user_data = JSON.parse(
    //   `{"coalition_name":"Gun","coalition_slug":"gun","image_url":"https://cdn.intra.42.fr/coalition/image/85/gun-svg-svg.svg","cover_url":"https://cdn.intra.42.fr/coalition/cover/85/gun_cover.jpg","color":"#ffc221","level":1.6600000000000001,"grade":"Learner","blackholed_at":"2021-04-05T01:00:00.000Z","begin_at":"2020-09-28T01:00:00.000Z","end_at":null,"cursus_name":"42cursus","cursus_slug":"42cursus","login":"jaeskim","first_name":"Jaeseo","last_name":"Kim","id":74960,"email":"jaeskim@student.42seoul.kr","capus":{"id":29,"name":"Seoul"}}`
    // );

    ctx.body = ReactDomServer.renderToStaticMarkup(
      <Stats userData={user_data} logo={logo} />
    );
  } catch (error) {
    ctx.res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    ctx.res.setHeader("Pragma", "no-cache");
    ctx.res.setHeader("Expires", "0");
    ctx.body = ReactDomServer.renderToStaticMarkup(<ErrorContainer />);
  }

  await next();
};
