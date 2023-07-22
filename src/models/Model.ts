import { Db, Collection } from "mongodb";
import client from "../mongodb/api";
export class Model {
  private db: Db | undefined;
  protected collection: Collection | undefined;
  private env_db: string;
  private env_collection: string;

  constructor(env_db: string, env_collection: string) {
    this.env_db = env_db;
    this.env_collection = env_collection;
    this.setCollectionDb();
  }

  private setCollectionDb() {
    this.db = client.db(this.env_db);
    this.collection = this.db.collection(this.env_collection);
  }

  public async getCountDocuments(id: string | null) {
    try {
      const response =
        id != null
          ? await this.collection?.countDocuments({ folder_id: id })
          : await this.collection?.countDocuments();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getAll() {
    try {
      const response = await this.collection?.find().toArray();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getById(id: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response = await this.collection?.findOne({ _id: id });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getByPage(index: number, limit: number) {
    try {
      const response = await this.collection
        ?.find()
        .skip(index)
        .limit(limit)
        .toArray();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
