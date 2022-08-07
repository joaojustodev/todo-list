import { NextApiRequest, NextApiResponse } from "next";
import { AuthSessionService } from "../../../services/auth/AuthSessionService";
import { ListTaskService } from "../../../services/task/ListTaskService";

async function listTasksHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }
  try {
    const session = await AuthSessionService.execute(req);

    if (!session) {
      throw new Error("Anything was wrong!!!");
    }

    const tasks = await ListTaskService.execute(session.userId);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json(error);
  }
}

export default listTasksHandler;
