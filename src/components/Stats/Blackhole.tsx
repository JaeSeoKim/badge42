/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Blackhole.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/23 12:23:26 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 13:08:55 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import getRemainDay from "../../util/getRemainDay";

const getDayColor = (day: number) => {
  if (day >= 50) return "rgb(83, 210, 122)";
  if (day >= 30) return "rgb(223, 149, 57)";
  return "rgb(255,69,0)";
};

interface Props {
  darkmode: boolean;
  data: {
    blackholed_at: string | null;
    begin_at: string;
    end_at: string | null;
  };
}

const Blackhole: React.FC<Props> = ({ darkmode, data }) => {
  const reaminDay = getRemainDay(data.blackholed_at);

  if (data.blackholed_at && reaminDay < 0)
    return (
      <div
        data-testid={"blackhole"}
        dangerouslySetInnerHTML={{
          __html: "<!-- You've been absorbed by the Black Hole. -->",
        }}
      />
    );

  return (
    <div
      style={{
        position: "absolute",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: "0px",
        top: "8px",
        width: "155px",
        height: "50px",
        borderRadius: "4.5px",
        backgroundColor: "rgba(32,32,38,0.7)",
        filter: darkmode && "saturate(50%)",
      }}
    >
      {data.blackholed_at ? (
        <>
          {" "}
          <p
            className={"fadeIn"}
            style={{
              animationDelay: "550ms",
              font:
                "400 9px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
              color: "#ffc221",
            }}
          >
            Black Hole absorption
          </p>
          <p
            className={"fadeIn"}
            style={{
              animationDelay: "600ms",
              marginTop: "5px",
              font:
                "400 20px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
              color: getDayColor(reaminDay),
            }}
            data-testid={"blackhole"}
          >
            {reaminDay} days left!
          </p>
        </>
      ) : (
        <>
          <p
            className={"fadeIn"}
            style={{
              animationDelay: "550ms",
              font:
                "400 9px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
              color: "#ffc221",
            }}
          >
            Period learned in 42!
          </p>
          <p
            className={"fadeIn"}
            style={{
              animationDelay: "600ms",
              marginTop: "5px",
              font:
                "400 13px 'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu",
              color: "rgb(83, 210, 122)",
            }}
            data-testid={"blackhole"}
          >
            {new Date(data.begin_at).toISOString().substring(0, 10)} ~{" "}
            {data.end_at &&
              new Date(data.end_at).toISOString().substring(0, 10)}
          </p>
        </>
      )}
    </div>
  );
};

export default Blackhole;
