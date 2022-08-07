import { NextApiRequest } from "next";
import { UpdateTaskUseCase } from "./../../useCases/task/UpdateTaskUseCase";

interface UpdateTaskRequest {
  id: string;
  isFinished: boolean;
}

export class UpdateTaskService {
  static async execute(req: NextApiRequest, userId: string) {
    try {
      const { id, isFinished } = req.body as UpdateTaskRequest;

      if (!id || isFinished === undefined || !userId) {
        throw new Error("Anything was wrong!!!");
      }

      const task = await UpdateTaskUseCase.handle(id, isFinished, userId);

      return task;
    } catch (error) {
      if (error) throw new Error("Cannot update this task");
    }
  }
}
