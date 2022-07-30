import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

async function listTasksHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  res.status(200).json(tasks);
}

export default listTasksHandler;
