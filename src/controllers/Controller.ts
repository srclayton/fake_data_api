import { FastifyRequest, FastifyReply } from "fastify";
import { Image } from "../models/Image";
import { Model } from "../models/Model";
import { User } from "../models/User";

export class Controller {
  protected model: Image | Model | User;
  private type = new Map([
    ["image", process.env.MONGO_DB_IMAGE_COLLECTION],
    ["folder", process.env.MONGO_DB_FOLDER_COLLECTION],
    ["user", process.env.MONGO_DB_USER_COLLECTION],
  ]);

  private limit = 25;
  constructor(model: string) {
    this.model =
      model === "image"
        ? new Image(
            process.env.MONGO_DB_NAME as string,
            this.type.get(model) as string
          )
        : model === "user"
        ? new User(
            process.env.MONGO_DB_NAME as string,
            this.type.get(model) as string
          )
        : new Model(
            process.env.MONGO_DB_NAME as string,
            this.type.get(model) as string
          );
  }

  public async getAll(request: FastifyRequest, reply: FastifyReply) {
    const items = await this.model.getAll();
    if (!items) {
      reply.code(404).send({ error: "Not Found" });
      return;
    }
    reply.code(200).send({
      total_items: await this.model.getCountDocuments(null),
      items,
    });
  }

  public async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const item = await this.model.getById(id);
    if (!item) {
      reply.code(404).send({ error: "Not Found" });
      return;
    }
    reply.code(200).send(item);
  }

  public async getByPage(request: FastifyRequest, reply: FastifyReply) {
    const { page } = request.params as { page: number };
    if (page < 1) {
      reply.code(404).send({
        error: "Not Found",
        message: `Value must be > 0, actual value ${page} `,
      });
      return;
    }

    const total_items = await this.model.getCountDocuments(null);
    if (!total_items) {
      reply.code(404).send({ error: "Not Found" });
      return;
    }

    const total_pages = Math.ceil(total_items / this.limit);
    if (page > total_pages) {
      reply.code(404).send({ error: "Not Found" });
      return;
    }

    const index = (page - 1) * this.limit;
    const items = await this.model.getByPage(index, this.limit);
    if (!items) {
      reply.code(500).send({ error: "Internal Server Error" });
      return;
    }

    reply.code(200).send({
      current_page: page,
      current_items: items?.length,
      total_pages,
      total_items,
      items,
    });
  }
}
