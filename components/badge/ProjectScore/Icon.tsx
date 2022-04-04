/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Icon.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 07:53:20 by jaeskim           #+#    #+#             */
/*   Updated: 2021/01/04 14:05:25 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

interface Props {
  type: "Success" | "Subscribed" | "Fail";
}

const Icon: React.FC<Props> = ({ type }) => {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {type == "Subscribed" && (
        <path d="M16 2.5L7.5 13.5H20L10 25" stroke="white" strokeWidth="5" />
      )}
      {type == "Success" && (
        <path d="M4 15L11.5 22L24 7" stroke="white" strokeWidth="5" />
      )}
      {type == "Fail" && (
        <path d="M5 5L24 24M23.5682 5L5 24" stroke="white" strokeWidth="5" />
      )}
    </svg>
  );
};

export default Icon;
