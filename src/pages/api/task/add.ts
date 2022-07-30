import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { TaskRepositorie } from "../../../repositories/taskRepositorie";

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

  const tasks = await prisma.task.count();

  if (tasks >= 10) {
    res.status(406).json({ error: "Maximun tasks: 10!" });
    return;
  }

  const slug = task.name.trim().replaceAll("&", "-and-").replaceAll(" ", "-");

  const data = {
    name: task.name,
    slug,
  };

  const add = await prisma.task.create({ data });

  res.status(201).json(add);
}

export default addTaskHandler;
