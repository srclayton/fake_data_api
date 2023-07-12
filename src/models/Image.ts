import client from "../mongodb/api";

export class Image {
  private static db = client.db(process.env.MONGO_DB_NAME);
  private static collection = this.db.collection(
    process.env.MONGO_DB_IMAGE_COLLECTION ?? "images"
  );

  public static async getAll() {
    try {
      const response = await this.collection.find().toArray();
      return response;
    } catch (error) {
      console.error(error);
      throw error; // Lança novamente o erro para que seja tratado em outro lugar, se necessário.
    }
  }

  public static async getById(id: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response = await this.collection.findOne({ _id: id });
      return response;
    } catch (error) {
      console.error(error);
      throw error; // Lança novamente o erro para que seja tratado em outro lugar, se necessário.
    }
  }

  public static getByFolder(folder: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response = this.collection
        .find({ folder })
        .sort({ title: 1 })
        .toArray();
      return response;
    } catch (error) {
      console.error(error);
      throw error; // Lança novamente o erro para que seja
    }
  }
}
