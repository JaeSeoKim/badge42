/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/22 18:41:01 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 01:48:42 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { css, Global, keyframes } from "@emotion/core";
import React from "react";
import Cursus from "./Cursus";
import Container from "./Container";
import Information from "./Information";
import Level from "./Level";
import Logo from "./Logo";
import Header from "./Header";

interface Props {
  data: {
    id: string;
    name: string;
    grade: string;
    email: string | null;
    level: number;
    cursus: string;
    campus: string;
  };
  darkmode: boolean;
  color: string;
  logo: string;
  cover: string;
}

const FlexContainer: React.FC<{ width: number }> = ({ width, children }) => {
  return (
    <div
      style={{
        display: "flex",
        width: width - 30,
        marginLeft: "15px",
        marginRight: "15px",
      }}
    >
      {children}
    </div>
  );
};

const Stats: React.FC<Props> = ({ data, color, cover, darkmode, logo }) => {
  const width = 495;
  const height = 195 - (data.email == null ? 25 : 0);

  const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;
  const scaleIn = keyframes`
    0%{ translate(-5px, 5px) sacle(0) }
    100%{ translate(-5px, 5px) sacle(1) }
  `;

  return (
    <Container
      width={width}
      height={height}
      darkmode={darkmode}
      color={color}
      backgroundImage={`url(${cover})`}
    >
      <Global
        styles={css`
          .fadeIn {
            opacity: 0;
            animation: ${fadeIn} 0.7s ease-in-out;
            animation-fill-mode: forwards;
          }
          .scaleIn {
            animation: ${scaleIn} 0.7s ease-in-out;
          }
        `}
      />
      <FlexContainer width={width}>
        <Logo darkmode={darkmode} color={color} logo={logo} />
        <Header darkmode={darkmode} name={data.id} campus={data.campus} />
        <Cursus cursus={data.cursus} />
      </FlexContainer>
      <FlexContainer width={width}>
        <Information name={data.name} grade={data.grade} email={data.email} />
      </FlexContainer>
      <FlexContainer width={width}>
        <Level darkmode={darkmode} level={data.level} color={color} />
      </FlexContainer>
    </Container>
  );
};

export default Stats;
