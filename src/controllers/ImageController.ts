import { FastifyRequest, FastifyReply } from "fastify";
import { Image } from "../models/Image";

export class ImageController {
  public async getAll(request: FastifyRequest, reply: FastifyReply) {
    const images = await Image.getAll();

    if (!images) {
      reply.code(404).send({ error: "Not Found" });
    }
    reply.code(200).send(images);
  }

  public async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const image = await Image.getById(id);

    if (!image) {
      reply.code(404).send({ error: "Not Found" });
    }
    reply.code(200).send(image);
  }

  public async getByFolder(request: FastifyRequest, reply: FastifyReply) {
    const { folder } = request.params as { folder: string };
    const images = await Image.getByFolder(folder);

    if (!images) {
      reply.code(404).send({ error: "Not Found" });
    }
    reply.code(200).send(images);
  }
}
