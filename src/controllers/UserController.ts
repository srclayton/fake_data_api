import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Controller } from "./Controller";
type User = {
  _id: string;
  username: string;
  password: string;
  name: string;
};
export class UserController extends Controller {
  private async getAccessToken(user: User, fastify: FastifyInstance) {
    const data = {
      _id: user._id,
      username: user.username,
      name: user.name,
    };
    const access_token = await fastify.jwt.sign(data, {
      expiresIn: "25s",
    });

    return access_token;
  }

  public async verifyUser(
    request: FastifyRequest,
    reply: FastifyReply,
    fastify: FastifyInstance
  ) {
    if (!request.body) return reply.code(400).send({ error: "Bad Request" });
    const { username, password } = request.body as {
      username: string;
      password: string;
    };
    if (!username || !password)
      return reply.code(400).send({ error: "Bad Request" });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await this.model.getUser(username);
    if (!user) {
      reply.code(404).send({ error: "Not Found" });
      return;
    }
    if (user.password !== password) {
      reply.code(401).send({ error: "Unauthorized" });
      return;
    }

    const access_token = await this.getAccessToken(user, fastify);

    const refresh_token = await fastify.jwt.sign(
      { _id: user._id },
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        key: process.env.JWT_REFRESH_SECRET as string,
        expiresIn: "1h",
      }
    );

    reply.code(200).send({
      access_token,
      refresh_token,
    });
  }

  public async refreshToken(
    request: FastifyRequest,
    reply: FastifyReply,
    fastify: FastifyInstance
  ) {
    try {
      const { _id } = request.headers as { _id: string };
      if (!_id) return reply.code(400).send({ error: "Bad Request" });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user = await this.model.getUser(_id.toString());
      if (!user) {
        reply.code(404).send({ error: "Not Found" });
        return;
      }
      const access_token = await this.getAccessToken(user, fastify);

      reply.code(200).send({
        access_token,
      });
    } catch (error) {
      reply.code(401).send({
        error: "Unauthorized",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: error.message,
      });
    }
  }
}
