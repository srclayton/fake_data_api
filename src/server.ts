import Fastify, { FastifyPluginOptions } from "fastify";
import pino from "pino";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import jwt, { SignOptions } from "@fastify/jwt";

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
  bodyUserLoginSchema,
  bodyUserRefreshSchema,
  paramsUserSchema,
  replyUserAboutSchema,
  replyUserAddressSchema,
  replyUserByIdSchema,
  replyUserCreditCardSchema,
  replyUserLoginSchema,
  replyUserRefreshSchema,
  replyUserSchema,
} from "./schemas/user";
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
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
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: `Bearer token 
        Lembre-se de incluir 'Bearer ' antes do token:
        Exemplo: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
      },
    },
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

fastify.addSchema({ $id: "UserLogin", ...bodyUserLoginSchema });
fastify.addSchema({ $id: "UserLoginReply", ...replyUserLoginSchema });
fastify.addSchema({ $id: "UserRefresh", ...bodyUserRefreshSchema });
fastify.addSchema({ $id: "UserRefreshReply", ...replyUserRefreshSchema });
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
  secret: JWT_TOKEN_SECRET as string,
});

fastify.register(userRoutes, { prefix: "/api/v1" });
fastify.register(imageRoutes, { prefix: "/api/v1" });
fastify.register(folderRoutes, { prefix: "/api/v1" });

fastify.addHook("onRequest", (request, reply, done) => {
  if (
    request.url !== "/" &&
    request.hostname !== "localhost:8080" &&
    request.protocol !== "https"
  )
    return reply.code(403).send({ error: "Forbidden" });
  switch (request.url) {
    case "/api/v1/refresh": {
      if (!request.headers.authorization)
        return reply.code(401).send({ error: "Unauthorized" });
      const token = request.headers.authorization?.split(" ")[1];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { _id } = fastify.jwt.verify(
        token as string,
        {
          key: JWT_REFRESH_SECRET,
        } as unknown as SignOptions
      );
      request.headers._id = _id;
      break;
    }
    case "/api/v1/validate": {
      if (!request.headers.authorization)
        return reply.code(401).send({ error: "Unauthorized" });
      const token = request.headers.authorization?.split(" ")[1];
      const response = fastify.jwt.verify(token as string);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      request.headers.response = response;
      break;
    }
  }
  done();
});

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
