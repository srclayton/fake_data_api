import { FastifyInstance } from "fastify";
import { Controller } from "../controllers/Controller";

export default async (fastify: FastifyInstance) => {
  const productController = new Controller("product");
  fastify.get(
    "/products",
    {
      schema: {
        description:
          "GET /products: Retorna uma lista de produtos disponíveis na API. Cada produto pode conter informações como ID, nome e outros detalhes relevantes.",
        tags: ["product"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              total_items: { type: "number" },
              items: { type: "array", items: { $ref: "Product#" } },
            },
          },
        },
      },
    },
    async (request, reply) => productController.getAll(request, reply)
  );

  fastify.get(
    "/products/page/:page",
    {
      schema: {
        description:
          "GET /products/page/{page}: Retorna uma lista de produtos disponíveis na API. Cada produto pode conter informações como ID, nome e outros detalhes relevantes.",
        tags: ["product"],
        params: {
          type: "object",
          properties: {
            page: { type: "number" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              current_page: { type: "number" },
              current_items: { type: "number" },
              total_pages: { type: "number" },
              total_items: { type: "number" },
              items: { type: "array", items: { $ref: "Product#" } },
            },
          },
        },
      },
    },
    async (request, reply) => productController.getByPage(request, reply)
  );

  fastify.get(
    "/products/:id",
    {
      schema: {
        description:
          "GET /products/{id}: Retorna um produto específico, identificado pelo ID informado.",
        tags: ["product"],
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            $ref: "ProductById#",
          },
        },
      },
    },
    async (request, reply) => productController.getById(request, reply)
  );
};
