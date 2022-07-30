import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

interface UpdateTaskHandler {
  id: string;
  finished: boolean;
}

async function uptateTaskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const { id, finished } = req.body as UpdateTaskHandler;

  if (!id || finished === undefined) {
    res.status(400).json({ error: "Any argument is undefined" });
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
