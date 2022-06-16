import React, { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "../components/Layout";
import Stats, { StatsProps } from "../components/badge/Stats";
import Code from "../components/Code";
import collection from "lodash-es/collection";
import { AuthContext, withAuth } from "../lib/auth/AuthProvider";
import { useContext } from "react";
import axios from "axios";
import getCoalitions from "../lib/getCoalitions";
import ProjectScore from "../components/badge/ProjectScore";

const StatsWrapper = ({ data }: StatsProps) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(false);
    const timer = setTimeout(() => {
      setIsShow(true);
    });

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(data)]);

  return (
    <div
      style={{
        width: "500px",
        height: "200px",
      }}
    >
      {isShow && <Stats data={data} />}
    </div>
  );
};

type StatsOptionsProps = {
  isDisplayName: boolean;
  isDisplayEmail: boolean;
  setIsDisplayName: (value: boolean) => void;
  setIsDisplayEmail: (value: boolean) => void;
};

const StatsOptions = ({
  isDisplayEmail,
  isDisplayName,
  setIsDisplayEmail,
  setIsDisplayName,
}: StatsOptionsProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const updateOption = useCallback(async () => {
    setIsFetching(true);
    try {
      await axios.patch("/api/v2/me", {
        isDisplayEmail: isDisplayEmail ? "true" : "false",
        isDisplayName: isDisplayName ? "true" : "false",
      });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else if (error instanceof Error) {
        alert(error.message);
      }
    }
    setIsFetching(false);
  }, [isDisplayEmail, isDisplayName]);

  return (
    <details>
      <summary>Options</summary>
      <div className="flex flex-col gap-2">
        <p className="border border-red-300 bg-red-100 rounded p-2 text-base text-bold">
          ⚠️ Depending on the browser cache and CDN cache, this option may take
          more than 12 hours to change.
        </p>
        <label className="flex gap-2">
          <p className="flex flex-0 font-bold text-base">Display Name</p>
          <select
            className="flex flex-1 text-base border rounded appearance-none px-1"
            value={isDisplayName ? "true" : "false"}
            onChange={(option) =>
              setIsDisplayName(option.target.value === "true")
            }
          >
            <option value={"true"}>true</option>
            <option value={"false"}>false</option>
          </select>
        </label>
        <label className="flex gap-2">
          <p className="flex flex-0 font-bold text-base">Display Email</p>
          <select
            className="flex flex-1 text-base border rounded appearance-none px-1"
            value={isDisplayEmail ? "true" : "false"}
            onChange={(option) =>
              setIsDisplayEmail(option.target.value === "true")
            }
          >
            <option value={"true"}>true</option>
            <option value={"false"}>false</option>
          </select>
        </label>
        <button
          className="transition-colors border rounded hover:bg-neutral-50 disabled:bg-neutral-50 disabled:cursor-not-allowed"
          disabled={isFetching}
          onClick={updateOption}
        >
          {isFetching ? "Saving..." : "Save"}
        </button>
      </div>
    </details>
  );
};

const Home = () => {
  const { data } = useContext(AuthContext);

  const [cursusId, setCursusId] = useState(
    data.extended42Data.cursus_users[
      data.extended42Data.cursus_users.length - 1
    ].cursus_id.toString()
  );
  const cursus_users = collection.keyBy(
    data.extended42Data.cursus_users,
    "cursus_id"
  );

  const selectedCursus =
    cursus_users[cursusId] ?? data.extended42Data.cursus_users[0];

  const [coalitionId, setCoalitionId] = useState(
    data.extended42Data.coalitions.length
      ? data.extended42Data.coalitions[
          data.extended42Data.coalitions.length - 1
        ].id.toString()
      : "undefined"
  );

  const [isDisplayName, setIsDisplayName] = useState(data.isDisplayName);
  const [isDisplayEmail, setIsDisplayEmail] = useState(data.isDisplayEmail);

  const coalition = useMemo(
    () => getCoalitions(coalitionId, data.extended42Data.coalitions),
    [coalitionId, data.extended42Data.coalitions]
  );

  useEffect(() => {
    if (
      data.extended42Data.coalitions.length &&
      selectedCursus.cursus.slug.includes("piscine")
    ) {
      setCoalitionId("piscine");
    }
  }, [selectedCursus, data.extended42Data.coalitions.length]);

  const statsUrl = `https://badge42.vercel.app/api/v2/${data.id}/stats?cursusId=${cursusId}&coalitionId=${coalitionId}`;
  const projectUrl = `https://badge42.vercel.app/api/v2/${data.id}/project`;

  const projectList = useMemo(
    () =>
      collection
        .filter(data.extended42Data.projects_users, (o) =>
          o.cursus_ids.includes(parseInt(cursusId))
        )
        .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)),
    [cursusId, data.extended42Data.projects_users]
  );

  const primaryCampus =
    collection.find(
      data.extended42Data.campus,
      (campus) =>
        campus.id ===
        (
          collection.find(
            data.extended42Data.campus_users,
            (campus_user) => campus_user.is_primary
          ) ?? data.extended42Data.campus_users[0]
        ).campus_id
    ) ?? data.extended42Data.campus[0];

  return (
    <Layout>
      <h1 id="badge42" className="text-3xl font-bold">
        Badge42
      </h1>
      <p>🚀 Dynamically generated 42 badge for your git readmes.</p>
      <h2 id="stats" className="text-2xl font-bold">
        💡 42 Stats Card!
      </h2>
      <p>
        Copy-paste this into your markdown content, and that&aposs it. Simple!
      </p>
      <div className="mx-auto max-w-full overflow-y-auto">
        <StatsWrapper
          data={{
            login: data.extended42Data.login,
            name: isDisplayName && data.extended42Data.displayname,
            campus: `42${primaryCampus.name}`,
            begin_at: selectedCursus.begin_at,
            end_at: selectedCursus.end_at,
            blackholed_at: selectedCursus.blackholed_at,
            cursus: selectedCursus.cursus.name,
            grade: selectedCursus.grade ?? "Pisciner",
            logo: coalition.image_url,
            cover: coalition.cover_url,
            color: coalition.color,
            email: isDisplayEmail && data.extended42Data.email,
            level: selectedCursus.level,
          }}
        />
      </div>
      <label className="flex gap-2">
        <p className="flex flex-0 font-bold text-base">Cursus</p>
        <select
          className="flex flex-1 text-base border rounded appearance-none px-1"
          value={cursusId}
          onChange={(option) => setCursusId(option.target.value)}
        >
          {data.extended42Data.cursus_users.map((cursus_user) => (
            <option key={cursus_user.cursus_id} value={cursus_user.cursus_id}>
              {cursus_user.cursus.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex gap-2">
        <p className="flex flex-0 font-bold text-base">Coalition</p>
        <select
          className="flex flex-1 text-base border rounded appearance-none px-1"
          value={coalitionId}
          onChange={(option) => setCoalitionId(option.target.value)}
        >
          <option value={"undefined"}>Undefined(No coalition)</option>
          <option value={"piscine"}>Piscine</option>
          {data.extended42Data.coalitions.map((colation) => (
            <option key={colation.id} value={colation.id}>
              {colation.name}
            </option>
          ))}
        </select>
      </label>
      <StatsOptions
        isDisplayEmail={isDisplayEmail}
        isDisplayName={isDisplayName}
        setIsDisplayEmail={setIsDisplayEmail}
        setIsDisplayName={setIsDisplayName}
      />
      <label>
        <p className="text-neutral-600">*url</p> <Code code={statsUrl} />
      </label>
      <label>
        <p className="text-neutral-600">*markdown</p>{" "}
        <Code
          code={`[![${data.extended42Data.login}'s 42 stats](${statsUrl})](https://github.com/JaeSeoKim/badge42)`}
        />
      </label>
      <label>
        <p className="text-neutral-600">*html</p>{" "}
        <Code
          code={`<a href="https://github.com/JaeSeoKim/badge42"><img src="${statsUrl}" alt="${data.extended42Data.login}'s 42 stats" /></a>`}
        />
      </label>
      <hr />
      <h2 id="stats" className="text-2xl font-bold">
        ✅ 42 ProjectScore Badge!
      </h2>
      <p>
        Copy-paste this into your markdown content, and that&aposs it. Simple!
      </p>
      {projectList.map((project) => (
        <details key={project.id}>
          <summary>
            <div className="inline-flex gap-2">
              <h3 className="text-lg font-semibold">{project.project.name}</h3>
              <ProjectScore data={project} />
            </div>
          </summary>
          <label>
            <p className="text-neutral-600">*url</p>{" "}
            <Code code={`${projectUrl}/${project.id}`} />
          </label>
          <label>
            <p className="text-neutral-600">*markdown</p>{" "}
            <Code
              code={`[![${data.extended42Data.login}'s 42 ${project.project.name} Score](${projectUrl}/${project.id})](https://github.com/JaeSeoKim/badge42)`}
            />
          </label>
          <label>
            <p className="text-neutral-600">*html</p>{" "}
            <Code
              code={`<a href="https://github.com/JaeSeoKim/badge42"><img src="${projectUrl}/${project.id}" alt="${data.extended42Data.login}'s 42 ${project.project.name} Score" /></a>`}
            />
          </label>
        </details>
      ))}
    </Layout>
  );
};

export default withAuth(Home, {
  required42account: true,
});
