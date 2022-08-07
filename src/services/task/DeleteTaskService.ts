import { NextApiRequest } from "next";
import { DeleteTaskUseCase } from "./../../useCases/task/DeleteTaskUseCase";

interface DeleteTaskRequest {
  id: string;
}

export class DeleteTaskService {
  static async execute(req: NextApiRequest, userId: string) {
    try {
      const { id } = req.body as DeleteTaskRequest;

      if (!id || !userId) {
        throw new Error("Anything was wrong!!!");
      }

      const task = await DeleteTaskUseCase.handle(id, userId);

      return task;
    } catch (error) {
      if (error) throw new Error("Cannot delete this task");
    }
  }
}
