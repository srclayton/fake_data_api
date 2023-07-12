import Fastify from "fastify";
import pino from "pino";

import folderRoutes from "./routes/folderRoutes";
import imageRoutes from "./routes/imageRoutes";

const fastify = Fastify({
  logger: pino({
    transport: {
      target: "pino-pretty",
    },
  }),
});

fastify.register(imageRoutes);
fastify.register(folderRoutes);

fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

fastify.listen({ port: 8080 }, (err) => {
  if (err) throw err;
});
