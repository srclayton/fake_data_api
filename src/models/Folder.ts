import client from "../mongodb/api";

export class Folder {
  private static db = client.db(process.env.MONGO_DB_NAME);
  private static collection = this.db.collection(
    process.env.MONGO_DB_FOLDER_COLLECTION ?? "folder"
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
}
