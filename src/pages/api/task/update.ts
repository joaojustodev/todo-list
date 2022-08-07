import { UpdateTaskService } from "./../../../services/task/UpdateTaskService";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthSessionService } from "../../../services/auth/AuthSessionService";

async function uptateTaskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ error: "METHOD NOT ALLOWED" });
    return;
  }

  try {
    const session = await AuthSessionService.execute(req);

    if (!session) {
      throw new Error("SESSION NOT DEFINED");
    }

    const up = await UpdateTaskService.execute(req, session.userId);

    res.status(200).json({ message: "Updated", ...up });
  } catch (error) {
    if (error) throw new Error("cru cru");
  }
}

export default uptateTaskHandler;
