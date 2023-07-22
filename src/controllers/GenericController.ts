import { FastifyRequest, FastifyReply } from "fastify";
import { Image } from "../models/Image";
import { Model } from "../models/Model";

export class GenericController {
  protected model: Image | Model;
  private type = new Map([
    ["image", process.env.MONGO_DB_IMAGE_COLLECTION],
    ["folder", process.env.MONGO_DB_FOLDER_COLLECTION],
  ]);

  private limit = 25;
  constructor(model: string) {
    this.model =
      model === "image"
        ? new Image(
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
    }
    reply.code(200).send(item);
  }

  public async getByPage(request: FastifyRequest, reply: FastifyReply) {
    const { page } = request.params as { page: string };
    const index = (parseInt(page) - 1) * this.limit;

    const items = await this.model.getByPage(index, this.limit);
    if (!items) {
      reply.code(404).send({ error: "Not Found" });
    }
    const total_items = await this.model.getCountDocuments(null);
    if (!total_items) {
      reply.code(500).send({ error: "Internal Server Error" });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const total_pages = Math.ceil(total_items / this.limit);
    reply.code(200).send({
      current_page: parseInt(page),
      current_items: items?.length,
      total_pages,
      total_items,
      items,
    });
  }
}
