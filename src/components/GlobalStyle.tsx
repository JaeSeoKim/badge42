/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GlobalStyle.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 01:06:27 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/05 01:35:48 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { css, keyframes, Global } from "@emotion/core";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
  `;
const scaleIn = keyframes`
  0%{ translate(-5px, 5px) sacle(0) }
  100%{ translate(-5px, 5px) sacle(1) }
  `;

const GlobalStyle: React.FC = () => {
  return (
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
  );
};

export default GlobalStyle;