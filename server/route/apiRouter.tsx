/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   apiRouter.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 17:47:48 by jaeskim           #+#    #+#             */
/*   Updated: 2022/04/05 00:42:37 by jaeskim          ###   ########seoul.kr  */
/*                                                                            */
/* ************************************************************************** */

import Router from "koa-router";
import { deprecateController } from "../controller/deprecateController";

const apiRouter = new Router();

apiRouter.get("/project/:intraId/:project", deprecateController);
apiRouter.get("/stats/:intraId", deprecateController);

export default apiRouter;
