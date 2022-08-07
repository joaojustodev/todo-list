import { prisma } from "../../lib/prisma";

export class UpdateTaskUseCase {
  static async handle(id: string, isFinished: boolean, userId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error("Task not find!!!");
    }

    if (task?.userId !== userId) {
      throw new Error("This task not pertence you");
    }

    const up = await prisma.task.update({
      where: {
        id,
      },
      data: {
        finished: isFinished,
        finishedAt: new Date(),
      },
    });

    return up;
  }
}
