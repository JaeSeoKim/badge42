/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   statsController.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/16 02:32:27 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Middleware } from "koa";
import fs from "fs";
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
    query: { privacyEmail },
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
    if (user_data.coalation.length) {
      const { image_url } = user_data.coalation[0];
      if (cacheStore.has(image_url)) logo = cacheStore.get(image_url);
      else {
        logo = await getImageToBase64(image_url);
        // Cache 14day!
        cacheStore.set(image_url, logo, 86400 * 14);
      }
    }

    /* SAMPLE DATA */
    // const user_data = await JSON.parse(
    //   fs
    //     .readFileSync("server/controller/sample-jeaskim-2020-11-05.json")
    //     .toString()
    // );
    ctx.body = ReactDomServer.renderToStaticMarkup(
      <Stats userData={user_data} logo={logo} privacyEmail={privacyEmail} />
    );
  } catch (error) {
    console.warn("ERROR-getUserStats : ", error);
    ctx.res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    ctx.res.setHeader("Pragma", "no-cache");
    ctx.res.setHeader("Expires", "0");
    ctx.body = ReactDomServer.renderToStaticMarkup(<ErrorContainer />);
  }

  await next();
};
