import { ObjectId } from "mongodb";
import { Model } from "./Model";

export class User extends Model {
  public async getUser(data: string) {
    try {
      const user = await this.collection?.findOne({
        $or: [{ username: data }, { _id: data as unknown as ObjectId }],
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
