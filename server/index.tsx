/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 17:47:12 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/04 21:33:59 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Koa from "koa";
import morgan from "koa-morgan";
import Router from "koa-router";
import bodyparser from "koa-body";
import NodeCache from "node-cache";
import React from "react";
import ReactDomServer from "react-dom/server";
import apiRouter from "./route/apiRouter";

const NODE_ENV = process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const dev = NODE_ENV === "development";
if (dev) {
  require("dotenv").config();
}

const main = async () => {
  const app = new Koa();
  const cacheStore = new NodeCache();
  const router = new Router();

  router.get("/", (ctx, next) => {
    ctx.redirect("https://github.com/JaeSeoKim/badge42#readme");
  });
  router.use("/api", apiRouter.routes());

  app.use(bodyparser());
  app.use(morgan(dev ? "dev" : "combined"));
  app.use(async (ctx, next) => {
    ctx.cacheStore = cacheStore;
    await next();
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(port, () => {
    console.log(
      `> ✨Ready on ${
        dev ? `http://localhost:${port}` : "https://badge42.herokuapp.com"
      }`
    );
  });
};

main();
