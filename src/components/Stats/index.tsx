/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:00:33 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/05 01:13:02 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { get42UserData } from "../../api/api42";
import getRemainDay from "../../util/getRemainDay";
import SvgContainer from "../SvgContainer";
import Blackhole from "./Blackhole";
import Cursus from "./Cursus";
import Header from "./Header";
import Information from "./Information";
import Level from "./Level";
import Logo from "./Logo";
import GlobalStyle from "../GlobalStyle";

interface Props {
  userData: get42UserData;
  logo: String;
}

const Stats: React.FC<Props> = ({ userData, logo }) => {
  const {
    info: { login, email, campus, first_name, last_name },
    coalation: [{ color: _color }],
    crusus: [
      {
        blackholed_at,
        cursus: { name: cursus_name },
        grade,
        level,
      },
    ],
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
    <SvgContainer color={color}>
      <GlobalStyle />
      <Logo logo={logo} />
      <Header name={login} cpusName={campus[0].name} />
      <Cursus cursusName={cursus_name} />
      <Information
        email={email}
        name={(first_name + " " + last_name).trim()}
        grade={grade}
      />
      <Blackhole blackholeRemain={blackholeRemain} />
      <Level level={level} color={color} />
    </SvgContainer>
  );
};

export default Stats;
