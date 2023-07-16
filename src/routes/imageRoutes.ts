import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ImageController } from "../controllers/ImageController";

export default async (fastify: FastifyInstance) => {
  const imageController = new ImageController();

  fastify.get("/images", async (request: FastifyRequest, reply: FastifyReply) =>
    imageController.getAll(request, reply)
  );

  fastify.get(
    "/images/:id",
    async (request: FastifyRequest, reply: FastifyReply) =>
      imageController.getById(request, reply)
  );

  fastify.get(
    "/images/folder/:folder",
    async (request: FastifyRequest, reply: FastifyReply) =>
      imageController.getByFolder(request, reply)
  );
};
