import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ImageController } from "../controllers/ImageController";

export default async (fastify: FastifyInstance) => {
  const imageController = new ImageController();

  fastify.get(
    "/images",
    {
      schema: {
        description:
          "Esta rota retorna uma lista de todas as imagens fictícias disponíveis no sistema. As imagens são geradas aleatoriamente e podem incluir metadados como ID, nome, tamanho, data de criação, etc.",
        tags: ["images"],
        response: {
          200: {
            description: "Succesful response",
            type: "array",
            items: { $ref: "Image#" },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      imageController.getAll(request, reply)
  );

  fastify.get(
    "/images/:id",
    {
      schema: {
        description:
          "Nesta rota, é possível obter informações detalhadas de uma imagem específica, fornecendo o ID correspondente na URL. Os detalhes podem incluir o tamanho, formato, data de criação simulada, entre outros.",
        tags: ["images"],
        response: {
          200: {
            description: "Succesful response",
            type: "object",
            $ref: "Image#",
          },
        },
        params: {
          $ref: "paramsImage#",
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      imageController.getById(request, reply)
  );

  fastify.get(
    "/images/folder/:folder",
    {
      schema: {
        description:
          "Essa rota retorna uma lista de imagens associadas a uma pasta específica, com base no ID fornecido na URL. As imagens são atribuídas aleatoriamente a pastas fictícias para simular a organização de arquivos.",
        tags: ["images", "folder"],
        response: {
          200: {
            description: "Succesful response",
            type: "array",
            items: {
              $ref: "ImageByFolder#",
            },
          },
        },
        params: {
          $ref: "paramsFolder#",
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      imageController.getByFolder(request, reply)
  );
};
