import { NextApiRequest } from "next";
import nookie from "nookies";
import { SESSION_TOKEN_COOKIE } from "../../constants/index";
import { prisma } from "../../lib/prisma";

export class AuthSessionUseCase {
  static async handle(req: NextApiRequest) {
    try {
      const sessionToken = nookie.get({ req })[SESSION_TOKEN_COOKIE];

      if (!sessionToken) {
        throw new Error("Anything was wrong!!!");
      }

      const verifySession = await prisma.session.findFirstOrThrow({
        where: {
          sessionToken,
        },
      });

      if (!verifySession) {
        throw new Error("You're bad brow!!!");
      }

      return verifySession;
    } catch (error) {
      if (error) throw new Error("message");
    }
  }
}
