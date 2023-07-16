import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { FolderController } from "../controllers/FolderController";

export default async (fastify: FastifyInstance) => {
  const folderController = new FolderController();

  fastify.get("/folder", async (request: FastifyRequest, reply: FastifyReply) =>
    folderController.getAll(request, reply)
  );
};
