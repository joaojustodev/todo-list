import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

interface UpdateTodosHandler {
  id: string;
  finished: boolean;
}

async function uptateTodosHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const { id, finished } = req.body as UpdateTodosHandler;

  if (!id || finished === undefined) {
    res.status(400).json({ error: "Any argument is undefined" });
    return;
  }

  await prisma.todo.update({
    where: { id },
    data: {
      isDone: finished,
    },
  });

  res.status(200).json({ message: "Updated" });
}

export default uptateTodosHandler;
