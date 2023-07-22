import { Model } from "./Model";
export class Image extends Model {
  public async getByFolder(folder: string) {
    try {
      const response = await this.collection
        ?.find({ folder_id: folder })
        .sort({ filename: 1 })
        .toArray();
      return response;
    } catch (error) {
      console.error(error);
      throw error; // Lança novamente o erro para que seja
    }
  }
}
