import collection from "lodash-es/collection";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../db";
import { get42UsersById } from "../../../lib/api/42api";

class AuthError extends Error {
  constructor() {
    super();
    this.name = "AuthError";
    this.message = "Authentication failed";
  }
}

// 12hour
const EXPIRE_TIME = 12 * 60 * 60;

const GetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session) throw AuthError;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: true,
        intraUser: {
          include: {
            cursus_users: {
              include: {
                cursus: true,
              },
            },
          },
        },
      },
      rejectOnNotFound: true,
    });

    const accounts = collection.keyBy(user.accounts, "provider");
    if (!accounts["42-school"]) throw AuthError;

    const ExpiresDate = new Date();
    ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", `public, max-age=${EXPIRE_TIME}`);
    res.setHeader("Expires", ExpiresDate.toISOString());

    if (
      user.intraUser &&
      user.intraUser.synced_at.valueOf() + EXPIRE_TIME * 1000 > Date.now()
    ) {
      return res.status(200).json(user.intraUser);
    }

    const { data: intraData } = await get42UsersById(
      accounts["42-school"].providerAccountId
    );

    await Promise.all([
      await prisma.intraUser.upsert({
        where: {
          id: parseInt(accounts["42-school"].providerAccountId),
        },
        create: {
          user_id: user.id,

          id: intraData.id,
          created_at: intraData.created_at,
          update_at: intraData.updated_at,
          login: intraData.login,
          email: intraData.email,
          displayname: intraData.displayname,
          isStaff: intraData["staff?"],
          pool_month: intraData.pool_month,
          pool_year: intraData.pool_year,
          anonymize_date: intraData.anonymize_date,
          alumni: intraData.alumni,
        },
        update: {
          update_at: intraData.updated_at,
          anonymize_date: intraData.anonymize_date,
          alumni: intraData.alumni,
        },
      }),
      ...intraData.cursus_users.map((cursus_user) => {
        return prisma.cursusUser.upsert({
          where: {
            id: cursus_user.id,
          },
          create: {
            id: cursus_user.id,
            level: cursus_user.level,
            begin_at: cursus_user.begin_at,
            created_at: cursus_user.created_at,
            updated_at: cursus_user.updated_at,
            blackholed_at: cursus_user.blackholed_at,
            end_at: cursus_user.end_at,
            grade: cursus_user.grade,
            user_id: intraData.id,
            cursus_id: cursus_user.cursus_id,
          },
          update: {
            updated_at: cursus_user.updated_at,
            blackholed_at: cursus_user.blackholed_at,
            end_at: cursus_user.end_at,
            grade: cursus_user.grade,
            level: cursus_user.level,
          },
        });
      }),
      prisma.cursus.createMany({
        data: intraData.cursus_users.map((cursus_user) => {
          return {
            id: cursus_user.cursus_id,
            created_at: cursus_user.cursus.created_at,
            name: cursus_user.cursus.name,
            slug: cursus_user.cursus.slug,
          };
        }),
        skipDuplicates: true,
      }),
    ]);

    const intraUser = await prisma.intraUser.findUnique({
      where: {
        user_id: user.id,
      },
      include: {
        cursus_users: {
          include: {
            cursus: true,
          },
        },
      },
      rejectOnNotFound: true,
    });

    return res.status(200).json(intraUser);
  } catch (error) {
    console.error(error);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    if (error instanceof AuthError) {
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
