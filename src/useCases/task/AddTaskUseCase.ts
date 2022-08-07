import { prisma } from "../../lib/prisma";
import { generateSlug } from "../../utils/generateSlug";

export class AddTaskUseCase {
  static async handler(name: string, userId: string) {
    try {
      const slug = generateSlug(name);

      const task = await prisma.task.create({
        data: {
          name,
          userId,
          slug,
        },
      });

      return task.id;
    } catch (error) {
      if (error) {
        throw new Error("Error to add a task");
      }
    }
  }
}
