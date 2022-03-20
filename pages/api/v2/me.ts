import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../db";
import {
  updateUserExtends42Data,
  UserNotFound,
} from "../../../lib/updateUserExtends42Data";

class AuthError extends Error {
  constructor() {
    super();
    this.name = "AuthError";
    this.message = "Authentication failed";
  }
}

const GetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });
    if (!token) throw new AuthError();

    const user = await updateUserExtends42Data({
      email: token.email,
    });

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AuthError || error instanceof UserNotFound) {
      return res.status(401).json({
        message: error.message,
      });
    }
    console.error(error);
    throw error;
  }
};

const DeleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });
    if (!token) throw new AuthError();
    await prisma.user.delete({
      where: {
        email: token.email,
      },
    });
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({
        message: error.message,
      });
    }
    console.error(error);
    throw error;
  }
};

class ValidateError extends Error {
  constructor(fields: string[]) {
    super();
    this.name = "ValidateError";
    this.message = `Body failed validation required [${fields.join(", ")}]`;
  }
}

const PatchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { isDisplayEmail, isDisplayName } = req.body as {
      isDisplayEmail?: string;
      isDisplayName?: string;
    };
    if (!isDisplayEmail || !isDisplayName)
      throw new ValidateError(
        [
          !isDisplayEmail && "isDisplayEmail",
          !isDisplayName && "isDisplayName",
        ].filter(Boolean)
      );

    const token = await getToken({ req });
    if (!token) throw new AuthError();

    await prisma.user.update({
      where: {
        email: token.email,
      },
      data: {
        isDisplayEmail: isDisplayEmail === "true",
        isDisplayName: isDisplayName === "true",
      },
    });

    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    if (error instanceof ValidateError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    if (error instanceof AuthError) {
      return res.status(401).json({
        message: error.message,
      });
    }
    console.error(error);
    throw error;
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return GetHandler(req, res);
    case "DELETE":
      return DeleteHandler(req, res);
    case "PATCH":
      return PatchHandler(req, res);
  }
  res.status(405).json({
    error: "method not allowed",
  });
}
