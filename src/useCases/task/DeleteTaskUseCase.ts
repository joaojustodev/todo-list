import { prisma } from "../../lib/prisma";

export class DeleteTaskUseCase {
  static async handle(id: string, userId: string) {
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

    const del = await prisma.task.delete({
      where: {
        id,
      },
    });

    return del.id;
  }
}
