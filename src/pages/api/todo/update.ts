import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

interface UpdateTodosHandler {
  id: string;
}

async function uptateTodosHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const { id } = req.body as UpdateTodosHandler;

  if (!id) {
    res.status(400).json({ error: "ID is required" });
    return;
  }

  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    res.status(400).json({ error: "Todo not found" });
    return;
  }

  const update = await prisma.todo.update({
    where: { id },
    data: {
      isDone: !todo.isDone,
    },
  });

  res.status(200).json(update);
}

export default uptateTodosHandler;
