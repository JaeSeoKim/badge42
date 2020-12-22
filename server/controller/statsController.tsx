/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   statsController.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 01:59:55 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Middleware } from "koa";
import fs from "fs";
import React from "react";
import ReactDomServer from "react-dom/server";
import _ from "lodash";
import {
  get42UserCoalitionCache,
  get42UserCursusCache,
  get42UserData,
  get42UserInfoCache,
} from "../../src/api/api42";
import Stats from "../../src/components/Stats";
import ErrorContainer from "../../src/components/ErrorContainer";

const EXPIRE_TIME = 43200;

export const getUserStats: Middleware = async (ctx, next) => {
  let {
    params: { intraId },
    query: { privacyEmail, cursus, darkmode },
    cacheStore,
  } = ctx;

  const ExpiresDate = new Date();
  ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);

  ctx.res.setHeader("Content-Type", "image/svg+xml");
  ctx.res.setHeader("Cache-Control", `public, max-age=${EXPIRE_TIME}`);
  ctx.res.setHeader("Expires", ExpiresDate.toISOString());

  try {
    let logo = "";
    let cover = "";
    let color = "#00BABC"; // Default Color

    const user_data = {
      info: await get42UserInfoCache(intraId, cacheStore),
      coalition: await get42UserCoalitionCache(intraId, cacheStore),
    };

    /* SAMPLE DATA */
    // const user_data: get42UserData = await JSON.parse(
    //   fs.readFileSync("test/sample-jeaskim-2020-11-05.json").toString()
    // );

    const index = cursus
      ? _.findIndex(cursus, {
          cursus: { name: cursus },
        })
      : user_data.info.cursus_users.length - 1;

    if (
      (!cursus || !cursus.toLowerCase().includes("piscine")) &&
      user_data.coalition.length > 0
    ) {
      if (user_data.coalition[0].cover_url)
        cover = `data:image/jpeg;base64,${fs
          .readFileSync(`src/img/cover/${user_data.coalition[0].id}.jpeg`)
          .toString("base64")}`;
      logo = `data:image/svg+xml;base64,${fs
        .readFileSync(`src/img/logo/${user_data.coalition[0].id}.svg`)
        .toString("base64")}`;
      color = user_data.coalition[0].color;
    } else {
      cover = `data:image/jpeg;base64,${fs
        .readFileSync(`src/img/cover/piscine.jpg`)
        .toString("base64")}`;
      logo = `data:image/svg+xml;base64,${fs
        .readFileSync(`src/img/logo/piscine.svg`)
        .toString("base64")}`;
    }

    ctx.body = ReactDomServer.renderToStaticMarkup(
      <Stats
        data={{
          id: intraId,
          name: user_data.info.first_name + " " + user_data.info.last_name,
          campus: user_data.info.campus[0].name,
          cursus:
            user_data.info.cursus_users[
              index != -1 ? index : user_data.info.cursus_users.length - 1
            ].cursus.name,
          email: privacyEmail == "true" ? null : user_data.info.email,
          grade:
            user_data.info.cursus_users[
              index != -1 ? index : user_data.info.cursus_users.length - 1
            ].grade,
          level:
            user_data.info.cursus_users[
              index != -1 ? index : user_data.info.cursus_users.length - 1
            ].level,
        }}
        darkmode={darkmode == "true"}
        color={color.includes("#") ? color : `#${color}`}
        cover={cover}
        logo={logo}
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
