/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   apiRouter.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/18 03:55:33 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/18 04:00:23 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import express from "express";

import { getUserStats } from "../controller/statsController";

const apiRouter = express.Router();

apiRouter.get("/stats/:user_name", getUserStats);

export default apiRouter;
