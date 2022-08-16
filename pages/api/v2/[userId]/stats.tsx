import collection from "lodash-es/collection";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDomServer from "react-dom/server";
import Stats from "../../../../components/badge/Stats";
import { getBase64ImageFromUrl } from "../../../../lib/getBase64ImageFromUrl";
import getCoalitions from "../../../../lib/getCoalitions";
import {
  updateUserExtends42Data,
  UserNotFound,
} from "../../../../lib/updateUserExtends42Data";

// 12hour
const EXPIRE_TIME = 12 * 60 * 60;

const BASE_URL = process.env.VERCEL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

class FTAccountNotLinked extends Error {
  constructor() {
    super();
    this.name = "FTAccountNotLinked";
    this.message = "42School Account Not Linked";
  }
}

const GetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, cursusId, coalitionId } = req.query as {
      userId: string;
      cursusId?: string;
      coalitionId?: string;
    };

    const user = await updateUserExtends42Data({
      id: userId,
    });

    const accounts = collection.keyBy(user.accounts, "provider");
    if (!accounts["42-school"]) throw new FTAccountNotLinked();

    const cursus_users = collection.keyBy(
      user.extended42Data.cursus_users,
      "cursus_id"
    );

    const cursus_user = cursusId
      ? cursus_users[cursusId]
      : user.extended42Data.cursus_users[
          user.extended42Data.cursus_users.length - 1
        ];

    const coalition = getCoalitions(
      coalitionId ??
        (cursus_user.cursus.slug.includes("piscine")
          ? "piscine"
          : user.extended42Data.coalitions.length
          ? user.extended42Data.coalitions[
              user.extended42Data.coalitions.length - 1
            ].id.toString()
          : "undefined"),
      user.extended42Data.coalitions,
      BASE_URL
    );

    const primaryCampus =
      collection.find(
        user.extended42Data.campus,
        (campus) =>
          campus.id ===
          (
            collection.find(
              user.extended42Data.campus_users,
              (campus_user) => campus_user.is_primary
            ) ?? user.extended42Data.campus_users[0]
          ).campus_id
      ) ?? user.extended42Data.campus[0];

    const [logo, cover] = await Promise.all([
      getBase64ImageFromUrl(encodeURI(coalition.image_url)),
      getBase64ImageFromUrl(
        coalition.cover_url ? encodeURI(coalition.cover_url) : `${BASE_URL}/assets/cover/default.jpg`
      ),
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
            campus: `42${primaryCampus.name}`,
            begin_at: cursus_user.begin_at,
            end_at: cursus_user.end_at,
            blackholed_at: cursus_user.blackholed_at,
            cursus: cursus_user.cursus.name,
            grade: cursus_user.grade ?? "Pisciner",
            logo: logo,
            cover: cover,
            color: coalition.color,
            email: user.isDisplayEmail && user.extended42Data.email,
            level: cursus_user.level,
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
