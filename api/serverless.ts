import * as dotenv from "dotenv";
import cors from "@fastify/cors";
// Require the framework

import { FastifyReply, FastifyRequest, fastify } from "fastify";
dotenv.config();
// Instantiate Fastify with some config
const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: true,
});
// Register your application as a normal plugin.
app.register(import("../src/app"), {
  prefix: "/",
});

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.ready();
  app.server.emit("request", req, res);
};
