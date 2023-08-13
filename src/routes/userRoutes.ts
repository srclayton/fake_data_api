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

  fastify.post(
    "/refresh",
    {
      schema: {
        description:
          "Um endpoint que permite que os usuários atualizem seus tokens expirados, fornecendo um token de atualização válido. Essa rota verifica o token de atualização, gera um novo token de acesso e o retorna para o cliente, estendendo a sessão de autenticação sem exigir novo login.",
        tags: ["user"],
        security: [{ Bearer: [] }],
        response: {
          200: {
            description: "Successful response",
            $ref: "UserRefreshReply#",
          },
        },
      },
    },
    async (request, reply) =>
      userController.refreshToken(request, reply, fastify)
  );

  fastify.post(
    "/login",
    {
      schema: {
        description:
          "Ao receber uma solicitação de login, o servidor verifica as credenciais fornecidas pelo usuário. Se as credenciais estiverem corretas, o servidor gera um token de acesso (um token JWT) que é retornado ao cliente. Esse token é então usado pelo cliente para fazer solicitações futuras ao servidor para acessar recursos protegidos.",
        tags: ["user"],
        body: {
          $ref: "UserLogin#",
        },
        response: {
          200: {
            description: "Successful response",
            $ref: "UserLoginReply#",
          },
        },
      },
    },
    async (request, reply) => userController.verifyUser(request, reply, fastify)
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

  fastify.get(
    "/user/page/:page",
    {
      schema: {
        description:
          "GET /user/page/:page: Retorna uma lista de usuários disponíveis na API. Cada usuário pode conter informações como ID, nome e outros detalhes relevantes.",
        tags: ["user"],
        params: {
          $ref: "paramsPage#",
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
              items: { type: "array", items: { $ref: "User#" } },
            },
          },
        },
      },
    },
    async (request, reply) => userController.getByPage(request, reply)
  );

  fastify.get("/validate", async (request, reply) => {
    reply.send({ data: request.headers.response });
  });
};
