import React from "react";
import BlackHole from "./BlackHole";
import Container from "./Container";
import Header from "./Header";
import Infomation from "./Infomation";
import Level from "./Level";

export type StatsProps = {
  data: {
    login: string;
    campus: string;
    cursus: string;
    grade: string;
    begin_at: string;
    blackholed_at?: string | null;
    end_at?: string | null;
    name?: string | null;
    email?: string | null;
    color: string;
    cover: string;
    logo: string;
  };
};

const Stats = ({ data }: StatsProps) => {
  const height = 190 - (!data.name || !data.email ? 25 : 0);
  const fgColor = (function() {

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(data.color);

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    const luminance = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance < 0.5 ? 'black' : 'white';
  })();

  return (
    <Container height={height} color={data.color} cover_url={data.cover}>
      <Header
        fg={fgColor}
        color={data.color}
        campus={data.campus}
        cursus={data.cursus}
        login={data.login}
        logo_url={data.logo}
      />
      <Infomation
        fg={fgColor}
        data={
          [
            ["Grade", data.grade],
            data.name && ["Name", data.name],
            data.email && ["Email", data.email],
          ].filter(Boolean) as [string, string][]
        }
      />
      {data.grade !== "Member" && (
        <BlackHole
          data={{
            begin_at: data.begin_at,
            blackholed_at: data.blackholed_at,
            end_at: data.end_at,
          }}
        />
      )}
      <Level height={height} color={data.color} level={5.17} />
    </Container>
  );
};

export default Stats;
