import { DeleteTaskService } from "./../../../services/task/DeleteTaskService";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { prisma } from "../../../lib/prisma";
import { AuthSessionService } from "../../../services/auth/AuthSessionService";
import { SESSION_TOKEN_COOKIE } from "./../../../constants";

interface DeleteTaskHandler {
  id: string;
}

async function deleteTaskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  try {
    const session = await AuthSessionService.execute(req);

    if (!session) {
      throw new Error("SESSION NOT DEFINED");
    }

    const del = await DeleteTaskService.execute(req, session.userId);

    res.status(200).json({ message: "Task deleted", id: del });
  } catch (error) {
    if (error) throw new Error("");
  }
}

export default deleteTaskHandler;
