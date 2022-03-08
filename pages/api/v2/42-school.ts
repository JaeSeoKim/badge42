// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

    const ExpiresDate = new Date();
    ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", `public, max-age=${EXPIRE_TIME}`);
    res.setHeader("Expires", ExpiresDate.toISOString());

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: true,
        intraUser: true,
      },
      rejectOnNotFound: true,
    });

    const accounts = collection.keyBy(user.accounts, "provider");
    if (!accounts["42-school"]) throw AuthError;
    if (
      user.intraUser &&
      user.intraUser.synced_at.valueOf() + 12 * 60 * 60 * 1000 > Date.now()
    ) {
      return res.status(200).json(user.intraUser);
    }
    const { data: intraUser } = await get42UsersById(
      accounts["42-school"].providerAccountId
    );

    const result = await prisma.intraUser.upsert({
      where: {
        id: accounts["42-school"].providerAccountId,
      },
      create: {
        userId: user.id,

        id: intraUser.id.toString(),
        created_at: intraUser.created_at,
        update_at: intraUser.updated_at,
        login: intraUser.login,
        email: intraUser.email,
        displayname: intraUser.displayname,
        isStaff: intraUser["staff?"],
        pool_month: intraUser.pool_month,
        pool_year: intraUser.pool_year,
        anonymize_date: intraUser.anonymize_date,
        alumni: intraUser.alumni,
      },
      update: {
        update_at: intraUser.updated_at,
        anonymize_date: intraUser.anonymize_date,
        alumni: intraUser.alumni,
      },
    });

    return res.status(200).json(result);
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
