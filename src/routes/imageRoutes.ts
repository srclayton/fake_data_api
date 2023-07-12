import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ImageController } from "../controllers/ImageController";

export default async function (fastify: FastifyInstance) {
  const imageController = new ImageController();

  fastify.get("/images", (request: FastifyRequest, reply: FastifyReply) =>
    imageController.getAll(request, reply)
  );

  fastify.get("/images/:id", (request: FastifyRequest, reply: FastifyReply) =>
    imageController.getById(request, reply)
  );

  fastify.get(
    "/images/folder/:folder",
    (request: FastifyRequest, reply: FastifyReply) =>
      imageController.getByFolder(request, reply)
  );
}
