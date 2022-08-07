import { NextApiRequest } from "next";
import { AuthSessionUseCase } from "../../useCases/auth/AuthSessionUseCase";

export class AuthSessionService {
  static async execute(req: NextApiRequest) {
    try {
      const session = await AuthSessionUseCase.handle(req);

      if (!session) {
        throw new Error("Anything was wrong!!!");
      }

      return session;
    } catch (error) {
      if (error) throw new Error("");
    }
  }
}
