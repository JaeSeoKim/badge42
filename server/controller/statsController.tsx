/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   statsController.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/22 01:25:52 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Middleware } from "koa";
import fs from "fs";
import React from "react";
import ReactDomServer from "react-dom/server";
import {
  get42UserCoalitionCache,
  get42UserCursusCache,
  get42UserInfoCache,
} from "../../src/api/api42";
import Stats from "../../src/components/Stats";
import getImageToBase64 from "../../src/util/getImageToBase64";
import ErrorContainer from "../../src/components/ErrorContainer";

const EXPIRE_TIME = 43200;

export const getUserStats: Middleware = async (ctx, next) => {
  const {
    params: { intraId },
    query: { privacyEmail, cursus, cover: isCover },
    cacheStore,
  } = ctx;

  const ExpiresDate = new Date();
  ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);

  ctx.res.setHeader("Content-Type", "image/svg+xml");
  ctx.res.setHeader("Cache-Control", `public, max-age=${EXPIRE_TIME}`);
  ctx.res.setHeader("Expires", ExpiresDate.toISOString());

  try {
    let logo = "";
    let cover = null;
    const user_data = {
      info: await get42UserInfoCache(intraId, cacheStore),
      coalition: await get42UserCoalitionCache(intraId, cacheStore),
      cursus: await get42UserCursusCache(intraId, cacheStore),
    };

    /* SAMPLE DATA */
    // const user_data: get42UserData = await JSON.parse(
    //   fs.readFileSync("test/sample-jeaskim-2020-11-05.json").toString()
    // );
    if (user_data.coalition.length) {
      const coalition = user_data.coalition[0];
      const coalitions = fs.readFileSync("src/coalitions.json");
      if (coalitions[coalition.id]) {
        logo = `data:image/svg+xml;base64,${fs
          .readFileSync(`src/img/logo/${coalition.id}.svg`)
          .toString("base64")}`;
        if (
          (!cursus || !cursus.toLowerCase().includes("piscine")) &&
          coalition.cover_url &&
          isCover != "false"
        )
          cover = `data:image/jpeg;base64,${fs
            .readFileSync(`src/img/cover/${coalition.id}.jpeg`)
            .toString("base64")}`;
        else if (isCover != "false")
          cover = `data:image/jpeg;base64,${fs
            .readFileSync(`src/img/cover/piscine.jpg`)
            .toString("base64")}`;
      } else if (cacheStore.has(coalition.image_url))
        logo = cacheStore.get(coalition.image_url);
      else {
        logo = await getImageToBase64(coalition.image_url);
        // Cache 14day!
        cacheStore.set(coalition.image_url, logo, 86400 * 14);
      }
    } else if (isCover != "false")
      cover = `data:image/jpeg;base64,${fs
        .readFileSync(`src/img/cover/piscine.jpg`)
        .toString("base64")}`;

    ctx.body = ReactDomServer.renderToStaticMarkup(
      <Stats
        userData={user_data}
        cursusName={cursus}
        logo={logo}
        cover={cover}
        privacyEmail={privacyEmail == "true"}
      />
    );
  } catch (error) {
    console.warn("ERROR-getUserStats : ", error);
    ctx.res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    ctx.res.setHeader("Pragma", "no-cache");
    ctx.res.setHeader("Expires", "0");
    ctx.body = ReactDomServer.renderToStaticMarkup(
      <ErrorContainer smallBadge={false} message={null} />
    );
  }

  await next();
};
