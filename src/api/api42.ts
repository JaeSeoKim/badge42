/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api42.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 21:20:41 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/21 23:10:17 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Axios from "axios";
import { token } from "koa-morgan";
import { chain } from "lodash";
import NodeCache from "node-cache";
import { string } from "prop-types";

// for development
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === "development") {
  require("dotenv").config();
}

const EXPIRE = 43200;
const END_POINT_42API = "https://api.intra.42.fr";

export interface get42TokenData {
  access_token: string;
  expires_in: number;
  created_at: number;
}

export const get42Token = async () => {
  const {
    data: { access_token, expires_in, created_at },
  } = await Axios.post<get42TokenData>(`${END_POINT_42API}/oauth/token`, {
    grant_type: "client_credentials",
    client_id: process.env.CLIENT_ID_42,
    client_secret: process.env.CLIENT_SECRET_42,
  });

  return {
    access_token,
    expires_in,
    created_at,
  };
};

export const get42TokenCache = async (cacheStore: NodeCache) => {
  if (cacheStore.has("token")) return cacheStore.get<string>("token");
  const { access_token, expires_in } = await get42Token();
  cacheStore.set("token", access_token, expires_in);
  return access_token;
};

export interface projects_users {
  id: number;
  occurrence: number;
  final_mark: number;
  status: string;
  "validated?": boolean | null;
  current_team_id: number;
  project: {
    id: number;
    name: string;
    slug: string;
    parent_id: any;
  };
  cursus_ids: number[];
  marked_at: string;
  marked: boolean;
  retriable_at: string | null;
}
export interface get42UserInfoData {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  url: string;
  phone: string;
  displayname: string;
  image_url: string;
  "staff?": boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  anonymize_date: string | null;
  campus: { id: number; name: string }[];
  projects_users: projects_users[];
}

export const get42UserInfo = async (name: string, access_token: string) => {
  const { data } = await Axios.get<get42UserInfoData>(
    `${END_POINT_42API}/v2/users/${name}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return data;
};

export const get42UserInfoCache = async (
  name: string,
  cacheStore: NodeCache
) => {
  if (cacheStore.has(`${name}_info`))
    return cacheStore.get<get42UserInfoData>(`${name}_info`);
  const token = await get42TokenCache(cacheStore);
  const userInfo = await get42UserInfo(name, token);
  cacheStore.set(`${name}_info`, userInfo, EXPIRE);
  return userInfo;
};

export interface get42UserCoalitionData {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  cover_url: string | null;
  color: string;
}

export const get42UserCoalition = async (name, access_token) => {
  const { data } = await Axios.get<Array<get42UserCoalitionData>>(
    `${END_POINT_42API}/v2/users/${name}/coalitions`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

export const get42UserCoalitionCache = async (
  name: string,
  cacheStore: NodeCache
) => {
  if (cacheStore.has(`${name}_coalition`))
    return cacheStore.get<get42UserCoalitionData[]>(`${name}_coalition`);
  const token = await get42TokenCache(cacheStore);
  const userCoalition = await get42UserCoalition(name, token);
  cacheStore.set(`${name}_coalition`, userCoalition, EXPIRE);
  return userCoalition;
};

export interface get42UserCursusData {
  level: number;
  grade: string | null;
  blackholed_at: string | null;
  begin_at: string;
  end_at: string | null;
  cursus: {
    name: string;
    slug: string;
  };
}

export const get42UserCursus = async (name, access_token) => {
  const { data } = await Axios.get<get42UserCursusData[]>(
    `${END_POINT_42API}/v2/users/${name}/cursus_users`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return data;
};

export const get42UserCursusCache = async (
  name: string,
  cacheStore: NodeCache
) => {
  if (cacheStore.has(`${name}_cursus`))
    return cacheStore.get<get42UserCursusData[]>(`${name}_cursus`);
  const token = await get42TokenCache(cacheStore);
  const userCursus = await get42UserCursus(name, token);
  cacheStore.set(`${name}_cursus`, userCursus, EXPIRE);
  return userCursus;
};

export interface get42UserData {
  info: get42UserInfoData;
  coalition: Array<get42UserCoalitionData>;
  cursus: Array<get42UserCursusData>;
}

export const get42API = async (path: string) => {
  const { access_token } = await get42Token();
  const { data } = await Axios.get(`${END_POINT_42API}/${path}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};
