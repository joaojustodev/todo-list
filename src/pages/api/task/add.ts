import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { TaskRepositorie } from "../../../repositories/taskRepositorie";
import nookies from "nookies";

const SESSION_TOKEN_COOKIE = "next-auth.session-token";

async function addTaskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const task = req.body as TaskRepositorie;

  if (!task.name) {
    res.status(400).json({ error: "Name is required" });
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

  const tasks = await prisma.task.count({
    where: { userId: verifySessionToken.userId },
  });

  if (tasks >= 10) {
    res.status(406).json({ error: "Maximun tasks: 10!" });
    return;
  }

  const slug = task.name.trim().replaceAll("&", "-and-").replaceAll(" ", "-");

  const data = {
    name: task.name,
    slug,
    userId: verifySessionToken.userId,
  };

  const add = await prisma.task.create({ data });

  res.status(201).json(add);
}

export default addTaskHandler;
