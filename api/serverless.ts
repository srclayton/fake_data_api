import * as dotenv from "dotenv";

// Require the framework

import { FastifyReply, FastifyRequest, fastify } from "fastify";
dotenv.config();
// Instantiate Fastify with some config
const app = fastify({
  logger: false,
});

// Register your application as a normal plugin.
app.register(import("../src/app"), {
  prefix: "/",
});

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.ready();
  app.server.emit("request", req, res);
};
