import type { NextApiRequest, NextApiResponse } from "next";

const GetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query as {
    userId: string;
  };
  res.redirect(307, `/api/v2/${userId}/stats${req.url.split(userId)[1]}`);
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
