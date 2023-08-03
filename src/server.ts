import Fastify, { FastifyPluginOptions } from "fastify";
import pino from "pino";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import folderRoutes from "./routes/folderRoutes";
import imageRoutes from "./routes/imageRoutes";
import {
  replyImageByFolderSchema,
  paramsImageSchema,
  paramsImageByFolderSchema,
  paramsImageByPage,
  replyImageSchema,
} from "./schemas/image";
import { paramsFolderSchema, replyFolderSchema } from "./schemas/folder";
import userRoutes from "./routes/userRoutes";
import {
  paramsUserSchema,
  replyUserAboutSchema,
  replyUserAddressSchema,
  replyUserByIdSchema,
  replyUserCreditCardSchema,
  replyUserSchema,
} from "./schemas/user";

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
fastify.addSchema({ $id: "ImageByFolder", ...replyImageByFolderSchema });
fastify.addSchema({ $id: "paramsImage", ...paramsImageSchema });
fastify.addSchema({ $id: "paramsPage", ...paramsImageByPage });

fastify.addSchema({ $id: "Folder", ...replyFolderSchema });
fastify.addSchema({ $id: "paramsFolder", ...paramsImageByFolderSchema });
fastify.addSchema({ $id: "paramsFolderSchema", ...paramsFolderSchema });

fastify.addSchema({ $id: "User", ...replyUserSchema });
fastify.addSchema({ $id: "UserById", ...replyUserByIdSchema });
fastify.addSchema({ $id: "UserAddress", ...replyUserAddressSchema });
fastify.addSchema({ $id: "UserCreditCard", ...replyUserCreditCardSchema });
fastify.addSchema({ $id: "UserAbout", ...replyUserAboutSchema });
fastify.addSchema({ $id: "paramsUser", ...paramsUserSchema });

fastify.register(cors, {
  origin: true,
});

fastify.register(jwt, {
  secret: "secret",
});

fastify.register(userRoutes, { prefix: "/api/v1" });
fastify.register(imageRoutes, { prefix: "/api/v1" });
fastify.register(folderRoutes, { prefix: "/api/v1" });

// fastify.setErrorHandler((error, request, reply) => {
//   reply.send({
//     statusCode: 500,
//     error: "Internal Server Error",
//     message: error.message,
//   });
// });

fastify.listen({ port: 8080 }, (err) => {
  if (err) throw err;
});
