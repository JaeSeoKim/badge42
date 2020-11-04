/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   apiRouter.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 17:47:48 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/04 20:36:05 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Router from "koa-router";
import { getUserStats } from "../controller/statsController";

const apiRouter = new Router();

apiRouter.get("/stats/:intraId", getUserStats);

export default apiRouter;
