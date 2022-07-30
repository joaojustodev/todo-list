import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

interface DeleteTaskHandler {
  id: string;
}

async function deleteTaskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
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
