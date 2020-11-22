/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   projectController.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 03:00:44 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/22 18:27:49 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Middleware } from "koa";
import fs from "fs";
import _ from "lodash";
import React from "react";
import ReactDomServer from "react-dom/server";
import {
  get42Token,
  get42UserInfoData,
  get42UserInfo,
  projects_users,
} from "../../src/api/api42";
import ProjectScore from "../../src/components/ProjectScore";
import ErrorContainer from "../../src/components/ErrorContainer";

const EXPIRE_TIME = 43200;

export const getUserProjectScore: Middleware = async (ctx, next) => {
  const {
    params: { intraId, project },
    cacheStore,
  } = ctx;

  const ExpiresDate = new Date();
  ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);

  ctx.res.setHeader("Content-Type", "image/svg+xml");
  ctx.res.setHeader("Cache-Control", `public, max-age=${EXPIRE_TIME}`);
  ctx.res.setHeader("Expires", ExpiresDate.toISOString());

  try {
    let token = "";
    let userInfo: get42UserInfoData;

    if (cacheStore.has(`${intraId}_info`))
      userInfo = cacheStore.get(`${intraId}_info`);
    else {
      if (cacheStore.has("token")) {
        token = cacheStore.get("token");
      } else {
        const { access_token, expires_in } = await get42Token();
        token = access_token;
        cacheStore.set("token", token, expires_in);
      }
      userInfo = await get42UserInfo(intraId, token);
      cacheStore.set(`${intraId}_info`, userInfo, EXPIRE_TIME);
    }

    const index = _.findIndex<projects_users>(userInfo.projects_users, {
      project: { name: project },
    });
    if (index == -1) throw Error("project not found!");

    ctx.body = ReactDomServer.renderToStaticMarkup(
      <ProjectScore data={userInfo.projects_users[index]} />
    );
  } catch (error) {
    ctx.res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    ctx.res.setHeader("Pragma", "no-cache");
    ctx.res.setHeader("Expires", "0");
    if (error == "Error: project not found!")
      ctx.body = ReactDomServer.renderToStaticMarkup(
        <ErrorContainer smallBadge={true} message={"project not found!"} />
      );
    else
      ctx.body = ReactDomServer.renderToStaticMarkup(
        <ErrorContainer smallBadge={true} message={"Something went wrong!"} />
      );
  }

  await next();
};
