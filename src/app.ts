import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyServerOptions,
} from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

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
import {
  replyUserSchema,
  replyUserByIdSchema,
  replyUserAddressSchema,
  replyUserCreditCardSchema,
  replyUserAboutSchema,
  paramsUserSchema,
  bodyUserLoginSchema,
  bodyUserRefreshSchema,
  replyUserLoginSchema,
  replyUserRefreshSchema,
} from "./schemas/user";
import userRoutes from "./routes/userRoutes";
import { SignOptions } from "@fastify/jwt";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export default async function (
  instance: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
) {
  instance.register(fastifySwagger, {
    swagger: {
      schemes: ["https"],
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

  instance.register(fastifySwaggerUI, {
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

  instance.addSchema({ $id: "Image", ...replyImageSchema });
  instance.addSchema({ $id: "ImageByFolder", ...replyImageByFolderSchema });
  instance.addSchema({ $id: "paramsImage", ...paramsImageSchema });
  instance.addSchema({ $id: "paramsPage", ...paramsImageByPage });

  instance.addSchema({ $id: "Folder", ...replyFolderSchema });
  instance.addSchema({ $id: "paramsFolder", ...paramsImageByFolderSchema });
  instance.addSchema({ $id: "paramsFolderSchema", ...paramsFolderSchema });

  instance.addSchema({ $id: "UserLogin", ...bodyUserLoginSchema });
  instance.addSchema({ $id: "UserLoginReply", ...replyUserLoginSchema });
  instance.addSchema({ $id: "UserRefresh", ...bodyUserRefreshSchema });
  instance.addSchema({ $id: "UserRefreshReply", ...replyUserRefreshSchema });

  instance.addSchema({ $id: "User", ...replyUserSchema });
  instance.addSchema({ $id: "UserById", ...replyUserByIdSchema });
  instance.addSchema({ $id: "UserAddress", ...replyUserAddressSchema });
  instance.addSchema({ $id: "UserCreditCard", ...replyUserCreditCardSchema });
  instance.addSchema({ $id: "UserAbout", ...replyUserAboutSchema });
  instance.addSchema({ $id: "paramsUser", ...paramsUserSchema });

  instance.register(userRoutes, { prefix: "/api/v1" });
  instance.register(imageRoutes, { prefix: "/api/v1" });
  instance.register(folderRoutes, { prefix: "/api/v1" });

  // instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
  //   res.status(200).send({
  //     hello: "World",
  //   });
  // });

  instance.addHook("onRequest", (request, reply, done) => {
    if (
      // request.url !== "/" &&
      request.url !== "/static/index.html" &&
      request.url !== "/" &&
      request.hostname !== "localhost:8080" &&
      request.headers["x-forwarded-proto"] !== "https"
    )
      return reply.code(403).send({
        error: "Forbidden",
        url: request.url,
        hostname: request.hostname,
        protocol: request.headers["x-forwarded-proto"],
      });
    switch (request.url) {
      case "/api/v1/refresh": {
        if (!request.headers.authorization)
          return reply.code(401).send({ error: "Unauthorized" });
        const token = request.headers.authorization?.split(" ")[1];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { _id } = instance.jwt.verify(
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
        const response = instance.jwt.verify(token as string);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.headers.response = response;
        break;
      }
    }
    done();
  });

  done();
}
