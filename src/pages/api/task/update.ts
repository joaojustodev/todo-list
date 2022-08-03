import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { prisma } from "../../../lib/prisma";
import { SESSION_TOKEN_COOKIE } from "./../../../constants";

interface UpdateTaskHandler {
  id: string;
  finished: boolean;
}

async function uptateTaskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
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

  const { id, finished } = req.body as UpdateTaskHandler;

  if (!id || finished === undefined) {
    res.status(400).json({ error: "Any arguments is undefined" });
    return;
  }

  await prisma.task.update({
    where: { id },
    data: {
      finished,
      finishedAt: new Date(),
    },
  });

  res.status(200).json({ message: "Updated" });
}

export default uptateTaskHandler;
