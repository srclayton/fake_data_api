import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { GenericController } from "../controllers/GenericController";

export default async (fastify: FastifyInstance) => {
  const folderController = new GenericController("folder");

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

  fastify.get(
    "/folder/:id",
    {
      schema: {
        description:
          "Nesta rota, é possível obter informações detalhadas de uma pasta específica, fornecendo o ID correspondente na URL.",
        tags: ["folder"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            $ref: "Folder#",
          },
        },
        params: {
          $ref: "paramsFolderSchema#",
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      folderController.getById(request, reply)
  );
};
