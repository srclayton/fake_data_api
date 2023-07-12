import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "node:process";
import dotenv from "dotenv";
dotenv.config();

const uri = env.MONGO_DB_URI ?? null;
if (uri == null) {
  throw new Error("MONGO_DB_URI is not set");
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
}
run().catch(console.dir);
export default client;
