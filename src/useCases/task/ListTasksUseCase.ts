import { prisma } from "../../lib/prisma";

export class ListTaskUseCase {
  static async handler(userId: string) {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      });

      return tasks;
    } catch (error) {
      if (error) {
        throw new Error("tasks not found");
      }
    }
  }
}
