import * as dotenv from "dotenv";
import cors from "@fastify/cors";
// Require the framework

import { FastifyReply, FastifyRequest, fastify } from "fastify";
import jwt from "@fastify/jwt";
dotenv.config();
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
// Instantiate Fastify with some config
const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: JWT_TOKEN_SECRET as string,
});
// Register your application as a normal plugin.
app.register(import("../src/app"), {
  prefix: "/",
});

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.ready();
  app.server.emit("request", req, res);
};
