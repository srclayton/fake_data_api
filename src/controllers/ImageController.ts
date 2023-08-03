import { FastifyRequest, FastifyReply } from "fastify";
import { Controller } from "./Controller";

export class ImageController extends Controller {
  public async getByFolder(request: FastifyRequest, reply: FastifyReply) {
    const { folder } = request.params as { folder: string };
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const images = await this.model.getByFolder(folder);

      if (!images) {
        reply.code(404).send({ error: "Not Found" });
      }
      reply.code(200).send({
        total_items: await this.model.getCountDocuments(folder),
        items: images,
      });
    } catch (error) {
      reply.send(error);
      throw error;
    }
  }
}
