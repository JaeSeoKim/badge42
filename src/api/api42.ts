/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api42.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 21:20:41 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/23 13:58:07 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Axios from "axios";
import NodeCache from "node-cache";
import { string } from "prop-types";

// for development
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === "development") {
  require("dotenv").config();
}

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

export const get42UserInfo = async (
  user_name: string,
  access_token: string
) => {
  const { data } = await Axios.get<get42UserInfoData>(
    `${END_POINT_42API}/v2/users/${user_name}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return data;
};

export interface get42UserCoalitionData {
  name: string;
  slug: string;
  image_url: string;
  cover_url: string;
  color: string;
}

export const get42UserCoalition = async (user_name, access_token) => {
  const { data } = await Axios.get<Array<get42UserCoalitionData>>(
    `${END_POINT_42API}/v2/users/${user_name}/coalitions`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
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

export const get42UserCursus = async (user_id, access_token) => {
  const { data } = await Axios.get<Array<get42UserCursusData>>(
    `${END_POINT_42API}/v2/users/${user_id}/cursus_users`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return data;
};

export interface get42UserData {
  info: get42UserInfoData;
  coalition: Array<get42UserCoalitionData>;
  cursus: Array<get42UserCursusData>;
}

export const get42User = async (user_name: string, cacheStore: NodeCache) => {
  const EXPIRE = 43200;
  let token = "";
  let userInfo: get42UserInfoData;
  let userCoalition: Array<get42UserCoalitionData>;
  let userCursus: Array<get42UserCursusData>;

  if (cacheStore.has("token")) {
    token = cacheStore.get("token");
  } else {
    const { access_token, expires_in } = await get42Token();
    token = access_token;
    cacheStore.set("token", token, expires_in);
  }

  if (cacheStore.has(`${user_name}_info`))
    userInfo = cacheStore.get(`${user_name}_info`);
  else {
    userInfo = await get42UserInfo(user_name, token);
    cacheStore.set(`${user_name}_info`, userInfo, EXPIRE);
  }
  if (cacheStore.has(`${user_name}_coalition`))
    userCoalition = cacheStore.get(`${user_name}_coalition`);
  else {
    userCoalition = await get42UserCoalition(user_name, token);
    cacheStore.set(`${user_name}_coalition`, userCoalition, EXPIRE);
  }
  if (cacheStore.has(`${user_name}_cursus`))
    userCursus = cacheStore.get(`${user_name}_cursus`);
  else {
    userCursus = await get42UserCursus(userInfo.id, token);
    cacheStore.set(`${user_name}_cursus`, userCursus, EXPIRE);
  }

  return { info: userInfo, coalition: userCoalition, cursus: userCursus };
};
