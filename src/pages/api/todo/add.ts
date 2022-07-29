import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { TodoRepositorie } from "./../../../repositories/todoRepositorie";

async function addTodosHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  const todo = req.body as TodoRepositorie;

  if (!todo.name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const slug = todo.name.replaceAll(" ", "-");

  const data = {
    name: todo.name,
    slug,
  };

  const add = await prisma.todo.create({ data });

  res.status(201).json(add);
}

export default addTodosHandler;
