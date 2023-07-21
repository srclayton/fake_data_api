import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { FolderController } from "../controllers/FolderController";

export default async (fastify: FastifyInstance) => {
  const folderController = new FolderController();

  fastify.get("/onRequest", async (request, reply) => {
    const ip = request.headers["x-forwarded-for"] || request.ip;
    reply.send(`Hello, your IP address is ${ip}`);
  });
  fastify.get(
    "/folder",
    {
      schema: {
        description:
          " A rota /folder retorna uma lista de pastas simuladas disponíveis na API. Cada pasta pode conter informações como ID, nome, quantidade de imagens, entre outros.",
        tags: ["folder"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              total_items: { type: "number" },
              items: { type: "array", items: { $ref: "Folder#" } },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      folderController.getAll(request, reply)
  );
};
