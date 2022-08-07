import { NextApiRequest } from "next";
import { AddTaskUseCase } from "../../useCases/task/AddTaskUseCase";

interface AddTaskRequest {
  name: string;
}

export class AddTaskService {
  static async execute(req: NextApiRequest, userId: string) {
    try {
      const { name } = req.body as AddTaskRequest;

      if (!name || !userId) {
        throw new Error("Anything was wrong!!!");
      }

      const task = await AddTaskUseCase.handler(name, userId);

      return task;
    } catch (error) {
      if (error) throw new Error("");
    }
  }
}
