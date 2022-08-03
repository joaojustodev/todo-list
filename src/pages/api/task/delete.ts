import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { prisma } from "../../../lib/prisma";
import { SESSION_TOKEN_COOKIE } from "./../../../constants";

interface DeleteTaskHandler {
  id: string;
}

async function deleteTaskHandler(req: NextApiRequest, res: NextApiResponse) {
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

  const { id } = req.body as DeleteTaskHandler;

  if (!id) {
    res.status(400).json({ error: "ID is required" });
    return;
  }

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    res.status(400).json({ error: "Task not found" });
    return;
  }

  const deletedTask = await prisma.task.delete({
    where: { id },
  });

  res.status(200).json({ message: "Task deleted", id: deletedTask.id });
}

export default deleteTaskHandler;
