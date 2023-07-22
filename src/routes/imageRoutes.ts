import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ImageController } from "../controllers/ImageController";

export default async (fastify: FastifyInstance) => {
  const imageController = new ImageController("image");
  fastify.get(
    "/images",
    {
      schema: {
        description:
          "Esta rota retorna uma lista de todas as imagens fictícias disponíveis no sistema. As imagens são geradas aleatoriamente e podem incluir metadados como ID, nome, tamanho, data de criação, etc.",
        tags: ["images"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              total_items: { type: "number" },
              items: { type: "array", items: { $ref: "Image#" } },
            },
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
            description: "Successful response",
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
            description: "Successful response",
            type: "object",
            properties: {
              total_items: { type: "number" },
              items: { type: "array", items: { $ref: "ImageByFolder#" } },
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

  fastify.get(
    "/images/page/:page",
    {
      schema: {
        tags: ["images"],
        description:
          "Quando um cliente faz uma solicitação GET para esta rota, o servidor retorna uma página de imagens, onde o número de imagens por página é determinado anteriormente.",
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              current_page: { type: "number" },
              current_items: { type: "number" },
              total_pages: { type: "number" },
              total_items: { type: "number" },
              items: {
                type: "array",
                items: { $ref: "Image#" },
              },
            },
          },
        },
        params: {
          $ref: "paramsPage#",
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      imageController.getByPage(request, reply)
  );
};
