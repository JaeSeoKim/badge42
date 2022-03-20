import collection from "lodash-es/collection";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDomServer from "react-dom/server";
import Stats from "../../../../components/badge/Stats";
import { getBase64ImageFromUrl } from "../../../../lib/getBase64ImageFromUrl";
import {
  FTAccountNotLinked,
  updateUserExtends42Data,
  UserNotFound,
} from "../../../../lib/updateUserExtends42Data";

// 12hour
const EXPIRE_TIME = 12 * 60 * 60;

const BASE_URL = process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL;

const GetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id, cursusId } = req.query as {
      user_id: string;
      cursusId?: string;
    };

    const user = await updateUserExtends42Data({
      id: user_id,
    });

    const cursus_users = collection.keyBy(
      user.extended42Data.cursus_users,
      "cursus_id"
    );

    const cursus_user = cursusId
      ? cursus_users[cursusId]
      : user.extended42Data.cursus_users[
          user.extended42Data.cursus_users.length - 1
        ];

    const coalition = (() => {
      if (cursus_user.cursus.slug.includes("piscine")) {
        return {
          image_url: `${BASE_URL}/assets/logo/piscine.svg`,
          cover_url: `${BASE_URL}/assets/cover/default.jpg`,
          color: "#00babc",
        };
      }

      if (!user.extended42Data.coalitions.length) {
        return {
          image_url: `${BASE_URL}/assets/logo/unknown.svg`,
          cover_url: `${BASE_URL}/assets/cover/default.jpg`,
          color: "#00babc",
        };
      }
      const coalition =
        user.extended42Data.coalitions[
          user.extended42Data.coalitions.length - 1
        ];

      return {
        image_url: coalition.image_url ?? `${BASE_URL}/assets/logo/unknown.svg`,
        cover_url:
          coalition.cover_url ?? `${BASE_URL}/assets/cover/default.jpg`,
        color: coalition.color.trim().startsWith("#")
          ? coalition.color.trim()
          : `#${coalition.color.trim()}`,
      };
    })();

    const [logo, cover] = await Promise.allSettled([
      getBase64ImageFromUrl(coalition.image_url),
      getBase64ImageFromUrl(coalition.cover_url),
    ]);

    if (process.env.NODE_ENV === "production") {
      const ExpiresDate = new Date();
      ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);
      res.setHeader("Cache-Control", `public, max-age=${EXPIRE_TIME}`);
      res.setHeader("Expires", ExpiresDate.toISOString());
    }

    res.setHeader("Content-Type", "image/svg+xml");
    return res.status(200).send(
      ReactDomServer.renderToStaticMarkup(
        <Stats
          data={{
            login: user.extended42Data.login,
            name: user.isDisplayName && user.extended42Data.displayname,
            campus: `42${user.extended42Data.campus[0].name}`,
            begin_at: cursus_user.begin_at,
            end_at: cursus_user.end_at,
            blackholed_at: cursus_user.blackholed_at,
            cursus: cursus_user.cursus.name,
            grade: cursus_user.grade ?? "Pisciner",
            logo: logo.status === "fulfilled" ? logo.value : "",
            cover: cover.status === "fulfilled" ? cover.value : "",
            color: coalition.color,
            email: user.isDisplayEmail && user.extended42Data.email,
          }}
        />
      )
    );
  } catch (error) {
    console.error(error);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    if (error instanceof UserNotFound) {
      return res.status(401).json({
        message: error.message,
      });
    }
    if (error instanceof FTAccountNotLinked) {
      return res.status(403).json({
        message: error.message,
      });
    }
    throw error;
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return GetHandler(req, res);
  }

  res.status(405).json({
    error: "method not allowed",
  });
}
