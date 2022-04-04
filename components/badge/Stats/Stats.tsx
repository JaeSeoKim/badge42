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
    level: number;
  };
};

const Stats = ({ data }: StatsProps) => {
  const height = 190 - (!data.name || !data.email ? 25 : 0);

  return (
    <Container height={height} color={data.color} cover_url={data.cover}>
      <Header
        color={data.color}
        campus={data.campus}
        cursus={data.cursus}
        login={data.login}
        logo_url={data.logo}
      />
      <Infomation
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
      <Level height={height} color={data.color} level={data.level} />
    </Container>
  );
};

export default Stats;
