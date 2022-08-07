import { ListTaskUseCase } from "../../useCases/task/ListTasksUseCase";

export class ListTaskService {
  static async execute(userId: string) {
    try {
      const tasks = await ListTaskUseCase.handler(userId);

      return tasks;
    } catch (error) {
      if (error) throw new Error("");
    }
  }
}
