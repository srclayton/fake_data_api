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
} from "./schemas/image";
import { replyFolderSchema } from "./schemas/folder";

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
  instance.addSchema({ $id: "Folder", ...replyFolderSchema });
  instance.addSchema({ $id: "ImageByFolder", ...replyImageByFolderSchema });
  instance.addSchema({ $id: "paramsImage", ...paramsImageSchema });
  instance.addSchema({ $id: "paramsFolder", ...paramsImageByFolderSchema });
  instance.register(imageRoutes);
  instance.register(folderRoutes);
  // instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
  //   res.status(200).send({
  //     hello: "World",
  //   });
  // });

  done();
}
