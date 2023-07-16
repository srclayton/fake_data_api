import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import imageRoutes from "./routes/imageRoutes";
import folderRoutes from "./routes/folderRoutes";

export default async function (
  instance: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
) {
  instance.register(imageRoutes);
  instance.register(folderRoutes);
  instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    res.status(200).send({
      hello: "World",
    });
  });

  done();
}
