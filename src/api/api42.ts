/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api42.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 21:20:41 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/05 01:17:30 by jaeskim          ###   ########.fr       */
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
  projects_users: {
    id: number;
    occurrence: number;
    final_mark: number;
    status: string;
    "validated?": boolean;
    current_team_id: number;
    project: {
      id: number;
      name: string;
      slug: string;
      parent_id: number | null;
    };
    cursus_ids: number[];
    marked_at: string;
    maked: boolean;
    retriable_at: string;
  }[];
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

export interface get42UserCrususData {
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

export const get42UserCrusus = async (user_id, access_token) => {
  const { data } = await Axios.get<Array<get42UserCrususData>>(
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
  coalation: Array<get42UserCoalitionData>;
  crusus: Array<get42UserCrususData>;
}

export const get42User = async (user_name: string, cacheStore: NodeCache) => {
  let token = "";

  if (cacheStore.has("token")) {
    token = cacheStore.get("token");
  } else {
    const { access_token, expires_in } = await get42Token();
    token = access_token;
    cacheStore.set("token", token, expires_in);
  }
  const userInfo = await get42UserInfo(user_name, token);
  const userCoaltion = await get42UserCoalition(user_name, token);
  const userCrusus = await get42UserCrusus(userInfo.id, token);

  return { info: userInfo, coalation: userCoaltion, crusus: userCrusus };
};
