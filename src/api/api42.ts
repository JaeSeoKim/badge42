/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api42.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 21:20:41 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/04 21:10:28 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Axios from "axios";
import NodeCache from "node-cache";

// for development
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === "development") {
  require("dotenv").config();
}

const END_POINT_42API = "https://api.intra.42.fr";

export const get42Token = async () => {
  const {
    // Result Example
    /*{
      access_token: "jaeskimjaeskimjaeskimjaeskimjaeskimjaeskim",
      expires_in: 7020,
      created_at: 1602765731
    }*/
    data: { access_token, expires_in, created_at },
  } = await Axios.post(`${END_POINT_42API}/oauth/token`, {
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

export const get42UserInfo = async (user_name, access_token) => {
  const {
    // Result Example
    /*{      
      login: "jaeskim",
      first_name: "Kim",
      last_name: "Jaeseo",
      id: 74960,
      email: "jaeskim@student.42seoul.kr",
      capus: {
        id: 29,
        name: "Seoul"
      }
    }*/
    data: {
      login,
      first_name,
      last_name,
      id,
      email,
      // Extract First campus!
      campus: [{ id: campus_id, name: campus_name }],
    },
  } = await Axios.get(`${END_POINT_42API}/v2/users/${user_name}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return {
    login,
    first_name,
    last_name,
    id,
    email,
    capus: {
      id: campus_id,
      name: campus_name,
    },
  };
};

export const get42UserCoalition = async (user_name, access_token) => {
  const {
    // Extract First Coalition!
    // Result Example
    /*{
      coalition_name: "Gun",
      coalition_slug: "gun",
      image_url: "https://cdn.intra.42.fr/coalition/image/85/gun-svg-svg.svg",
      cover_url: "https://cdn.intra.42.fr/coalition/cover/85/gun_cover.jpg",
      color: "#ffc221"
    }*/
    data: [
      {
        name: coalition_name,
        slug: coalition_slug,
        image_url,
        cover_url,
        color,
      },
    ],
  } = await Axios.get(`${END_POINT_42API}/v2/users/${user_name}/coalitions`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return {
    coalition_name,
    coalition_slug,
    image_url,
    cover_url,
    color,
  };
};

export const get42UserCrusus = async (user_id, access_token) => {
  const {
    // Extract First cursus!
    // Result Example
    /*{
        level: 1.6600000000000001,
        grade: "Learner",
        blackholed_at: "2021-04-05T01:00:00.000Z",
        begin_at: "2020-09-28T01:00:00.000Z",
        end_at: null,
        cursus_name: "42cursus",
        cursus_slug: "42cursus"
      }*/
    data: [
      {
        level,
        grade,
        blackholed_at,
        begin_at,
        end_at,
        cursus: { name: cursus_name, slug: cursus_slug },
      },
    ],
  } = await Axios.get(`${END_POINT_42API}/v2/users/${user_id}/cursus_users`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return {
    level,
    grade,
    blackholed_at,
    begin_at,
    end_at,
    cursus_name,
    cursus_slug,
  };
};

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

  // Result Example
  /*{
    login: "jaeskim",
    first_name: "Kim",
    last_name: "Jaeseo",
    coalition_name: "Gun",
    coalition_slug: "gun",
    image_url: "https://cdn.intra.42.fr/coalition/image/85/gun-svg-svg.svg",
    cover_url: "https://cdn.intra.42.fr/coalition/cover/85/gun_cover.jpg",
    color: "#ffc221",
    level: 1.6600000000000001,
    grade: "Learner",
    blackholed_at: "2021-04-05T01:00:00.000Z",
    begin_at: "2020-09-28T01:00:00.000Z",
    end_at: null,
    cursus_name: "42cursus",
    cursus_slug: "42cursus",
    id: 74960,
    email: "jaeskim@student.42seoul.kr",
    capus: {
      id: 29,
      name: "Seoul"
    }
  }*/
  return { ...userInfo, ...userCoaltion, ...userCrusus };
};