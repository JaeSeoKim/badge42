/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   apiRouter.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 03:55:33 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/19 01:15:50 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { getUserStats } from "../controller/statsController";

const apiRouter = express.Router();

apiRouter.use(
  "/camo",
  createProxyMiddleware({
    target: "https://cdn.intra.42.fr",
    changeOrigin: true,
    pathRewrite: {
      "^/api/camo": "",
    },
  })
);
apiRouter.get("/stats/:user_name", getUserStats);

export default apiRouter;
