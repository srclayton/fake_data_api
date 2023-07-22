import Fastify, { FastifyPluginOptions } from "fastify";
import pino from "pino";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import cors from "@fastify/cors";

import folderRoutes from "./routes/folderRoutes";
import imageRoutes from "./routes/imageRoutes";
import {
  replyImageSchema,
  replyImageByFolderSchema,
  paramsImageSchema,
  paramsImageByFolderSchema,
  paramsImageByPage,
} from "./schemas/image";
import { paramsFolderSchema, replyFolderSchema } from "./schemas/folder";

const fastify = Fastify({
  logger: pino({
    transport: {
      target: "pino-pretty",
    },
  }),
});

fastify.register(fastifySwagger, {
  swagger: {
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Fake Data API",
      description:
        "A API de Dados Falsos para Produção é ideal para projetos que precisam de dados fictícios para testes, desenvolvimento, prototipagem ou qualquer cenário onde a utilização de informações reais não é desejável. Ela permite que desenvolvedores obtenham acesso rápido a um conjunto diversificado de dados simulados, economizando tempo e recursos durante o desenvolvimento de diferentes aplicações. <br><br> Importante ressaltar que a API não deve ser utilizada em produção ou em ambientes reais, pois os dados fornecidos são meramente fictícios e não têm nenhuma relação com informações reais. Sua principal função é agilizar o processo de desenvolvimento e testes, garantindo a confidencialidade e segurança dos dados dos usuários finais.",
      version: "0.1.0",
      contact: {
        email: "clayton@srocha.dev",
      },
    },
  },
  exposeRoute: true,
  hideUntagged: true,
} as FastifyPluginOptions);

fastify.register(fastifySwaggerUI, {
  routePrefix: "/",
  uiConfig: {
    deepLinking: false,
  },
  uiHooks: {
    onRequest: (request, reply, next) => {
      next();
    },
    preHandler: (request, reply, next) => {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

fastify.addSchema({ $id: "Image", ...replyImageSchema });
fastify.addSchema({ $id: "Folder", ...replyFolderSchema });
fastify.addSchema({ $id: "ImageByFolder", ...replyImageByFolderSchema });
fastify.addSchema({ $id: "paramsImage", ...paramsImageSchema });
fastify.addSchema({ $id: "paramsFolder", ...paramsImageByFolderSchema });
fastify.addSchema({ $id: "paramsPage", ...paramsImageByPage });
fastify.addSchema({ $id: "paramsFolderSchema", ...paramsFolderSchema });

fastify.register(cors, {
  origin: true,
});

fastify.register(imageRoutes, { prefix: "/api/v1" });
fastify.register(folderRoutes, { prefix: "/api/v1" });

// fastify.get("/", (request, reply) => {
//   reply.send({ hello: "world" });
// });

fastify.listen({ port: 8080 }, (err) => {
  if (err) throw err;
});
