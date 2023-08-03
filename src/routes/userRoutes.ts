import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "../controllers/UserController";

export default async (fastify: FastifyInstance) => {
  const userController = new UserController("user");

  fastify.get(
    "/user",
    {
      schema: {
        description:
          "GET /user: Retorna uma lista de usuários disponíveis na API. Cada usuário pode conter informações como ID, nome e outros detalhes relevantes.",
        tags: ["user"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              total_items: { type: "number" },
              items: { type: "array", items: { $ref: "User#" } },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      userController.getAll(request, reply)
  );

  fastify.post("/refresh", async (request, reply) =>
    userController.refreshToken(request, reply, fastify)
  );

  fastify.post("/login", async (request, reply) =>
    userController.verifyUser(request, reply, fastify)
  );

  fastify.get(
    "/user/:id",
    {
      schema: {
        description:
          "GET /user/:id: Retorna informações específicas de um usuário com base no ID fornecido na URL. Essa rota é acionada por meio de uma solicitação GET e é usada para buscar e exibir detalhes sobre um usuário específico identificado pelo seu ID.",
        tags: ["user"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            $ref: "UserById#",
          },
        },
        params: {
          $ref: "paramsUser#",
        },
      },
    },
    async (request, reply) => userController.getById(request, reply)
  );

  fastify.get("/validate", async (request, reply) => {
    const token = request.headers.authorization?.split(" ")[1];
    const response = fastify.jwt.verify(token as string);
    reply.send({ response });
  });
};
