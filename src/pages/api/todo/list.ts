import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

async function listTodosHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  res.status(200).json(todos);
}

export default listTodosHandler;
