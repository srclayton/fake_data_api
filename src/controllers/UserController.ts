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
    const access_token = await fastify.jwt.sign(data, { expiresIn: "25s" });
    return access_token;
  }

  public async verifyUser(
    request: FastifyRequest,
    reply: FastifyReply,
    fastify: FastifyInstance
  ) {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };
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
      { expiresIn: "1h" }
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
      const token = request.headers.authorization?.split(" ")[1];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { _id } = await fastify.jwt.verify(token);

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
        message: error.message,
      });
    }
  }
}
