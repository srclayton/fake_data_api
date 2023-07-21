import { FastifyRequest, FastifyReply } from "fastify";
import { Folder } from "../models/Folder";

export class FolderController {
  public async getAll(request: FastifyRequest, reply: FastifyReply) {
    const folders = await Folder.getAll();

    if (!folders) {
      reply.code(404).send({ error: "Not Found" });
    }
    reply.code(200).send({
      total_items: Object.keys(folders).length,
      items: folders,
    });
  }
}
