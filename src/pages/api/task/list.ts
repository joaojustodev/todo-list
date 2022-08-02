import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import nookies from "nookies";

const SESSION_TOKEN_COOKIE = "next-auth.session-token";

async function listTasksHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const sessionToken = nookies.get({ req })[SESSION_TOKEN_COOKIE];

  const verifySessionToken = await prisma.session.findUniqueOrThrow({
    where: {
      sessionToken,
    },
  });

  if (!verifySessionToken) {
    res.status(404).json({ message: "SESSION NOT FOUND" });
  }

  const userId = verifySessionToken.userId;

  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      userId,
    },
  });

  res.status(200).json(tasks);
}

export default listTasksHandler;
