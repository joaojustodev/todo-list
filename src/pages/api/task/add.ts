import { NextApiRequest, NextApiResponse } from "next";
import { AuthSessionService } from "../../../services/auth/AuthSessionService";
import { AddTaskService } from "../../../services/task/AddTaskService";

async function addTaskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  try {
    const session = await AuthSessionService.execute(req);

    if (!session) {
      throw new Error("SESSION NOT DEFINED");
    }

    const add = await AddTaskService.execute(req, session.userId);

    res.status(201).json(add);
  } catch (error) {
    if (error) throw new Error("");
  }
}

export default addTaskHandler;
