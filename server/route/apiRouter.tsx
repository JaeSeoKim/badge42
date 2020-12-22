/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   apiRouter.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 17:47:48 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 01:29:06 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Router from "koa-router";
import { getUserStats } from "../controller/statsController";
import { getUserProjectScore } from "../controller/projectController";

const apiRouter = new Router();

apiRouter.get("/project/:intraId/:project", getUserProjectScore);
apiRouter.get("/stats/:intraId", getUserStats);

export default apiRouter;
