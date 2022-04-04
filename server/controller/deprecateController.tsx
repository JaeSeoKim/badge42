/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deprecateController.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2022/04/05 01:03:31 by jaeskim          ###   ########seoul.kr  */
/*                                                                            */
/* ************************************************************************** */

import { Middleware } from "koa";
import React from "react";
import ReactDomServer from "react-dom/server";
import ErrorContainer from "../../src/components/ErrorContainer";

export const deprecateController: Middleware = async (ctx, next) => {
  ctx.res.setHeader("Content-Type", "image/svg+xml");
  ctx.res.setHeader("Cache-Control", "public, immutable");
  ctx.body = ReactDomServer.renderToStaticMarkup(<ErrorContainer />);
  await next();
};
