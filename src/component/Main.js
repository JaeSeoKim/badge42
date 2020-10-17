/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:00:33 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/18 01:12:38 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import getRemainDay from "../util/getRemainDay";
import Blackhole from "./Blackhole";
import Cursus from "./Cursus";
import Header from "./Header";
import Level from "./Level";
import Logo from "./Logo";

const Main = ({ userData, logo }) => {
  const {
    color: _color,
    login: name,
    capus: { name: capusName },
    cursus_name: cursusName,
    blackholed_at,
    level,
  } = userData;

  const color =
    _color != null
      ? _color.substring(0, 1) == "#"
        ? _color
        : "#" + _color
      : "#00BABC";

  // TODO: end_at이 null이 아닌 경우 언제 종료 했는지 보여주어야 함.
  const blackholeRemain = getRemainDay(blackholed_at);

  return (
    <svg
      width="495"
      height="195"
      viewBox="0 0 495 195"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        rx="4.5"
        height="99%"
        stroke="#E4E2E2"
        width="494"
        fill={color}
        strokeOpacity="1"
      />
      <Logo color={color} logo={logo} />
      <Header name={name} cpusName={capusName} />
      <Cursus cursusName={cursusName} />
      <Blackhole blackholeRemain={blackholeRemain} />
      <Level level={level} color={color} />
    </svg>
  );
};

export default Main;
