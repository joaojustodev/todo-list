import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

interface DeleteTodosHandler {
  id: string;
}

async function deleteTodosHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const { id } = req.body as DeleteTodosHandler;

  if (!id) {
    res.status(400).json({ error: "ID is required" });
    return;
  }

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo) {
    res.status(400).json({ error: "Todo not found" });
    return;
  }

  const deleted = await prisma.todo.delete({
    where: { id },
  });

  res.status(200).json({ message: "Todo removed", id: deleted.id });
}

export default deleteTodosHandler;
