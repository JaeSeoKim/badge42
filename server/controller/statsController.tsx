/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   statsController.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2021/04/07 04:38:59 by lrocca           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Middleware } from "koa";
import fs from "fs";
import React from "react";
import ReactDomServer from "react-dom/server";
import _ from "lodash";
import {
  get42UserInfoCache,
  get42UserCoalitionCache,
} from "../../src/api/api42";
import Stats from "../../src/components/Stats";
import ErrorContainer from "../../src/components/ErrorContainer";
import { loadImage } from "../../src/util/loadImage";

const EXPIRE_TIME = 43200;

export const getUserStats: Middleware = async (ctx, next) => {
  let {
    params: { intraId },
    query: { privacyEmail, cursus, darkmode, privacyName },
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

    const cursus_users_index = cursus
      ? _.findIndex(user_data.info.cursus_users, {
          cursus: { name: cursus },
        })
      : user_data.info.cursus_users.length - 1;

    const campus_index = _.findIndex(user_data.info.campus, {
      id: _.find(user_data.info.campus_users, {
        is_primary: true,
      }).campus_id,
    });

    if (
      (!cursus ||
        (typeof cursus === "string" &&
          !cursus.toLowerCase().includes("piscine"))) &&
      user_data.coalition.length > 0
    ) {
      if (user_data.coalition[0].cover_url)
        cover = loadImage(
          `src/img/cover/${user_data.coalition[0].id}.jpg`,
          "src/img/cover/1.jpg"
        );
      logo = loadImage(
        `src/img/logo/${user_data.coalition[0].id}.svg`,
        "src/img/logo/unknown.svg",
        "image/svg+xml"
      );
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
          name:
            privacyName == "true"
              ? null
              : user_data.info.first_name + " " + user_data.info.last_name,
          campus: user_data.info.campus[campus_index].name,
          cursus:
            user_data.info.cursus_users[
              cursus_users_index != -1
                ? cursus_users_index
                : user_data.info.cursus_users.length - 1
            ].cursus.name,
          email: privacyEmail == "true" ? null : user_data.info.email,
          grade:
            user_data.info.cursus_users[
              cursus_users_index != -1
                ? cursus_users_index
                : user_data.info.cursus_users.length - 1
            ].grade || "Novice",
          level:
            user_data.info.cursus_users[
              cursus_users_index != -1
                ? cursus_users_index
                : user_data.info.cursus_users.length - 1
            ].level,
          blackhole: {
            begin_at:
              user_data.info.cursus_users[
                cursus_users_index != -1
                  ? cursus_users_index
                  : user_data.info.cursus_users.length - 1
              ].begin_at,
            blackholed_at:
              user_data.info.cursus_users[
                cursus_users_index != -1
                  ? cursus_users_index
                  : user_data.info.cursus_users.length - 1
              ].blackholed_at,
            end_at:
              user_data.info.cursus_users[
                cursus_users_index != -1
                  ? cursus_users_index
                  : user_data.info.cursus_users.length - 1
              ].end_at,
          },
        }}
        darkmode={darkmode == "true"}
        color={color.includes("#") ? color : `#${color}`}
        cover={cover}
        logo={logo}
      />
    );
  } catch (error) {
    ctx.res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    ctx.res.setHeader("Pragma", "no-cache");
    ctx.res.setHeader("Expires", "0");
    ctx.body = ReactDomServer.renderToStaticMarkup(
      <ErrorContainer smallBadge={false} message={null} />
    );
  }

  await next();
};
