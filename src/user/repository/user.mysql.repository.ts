import { DbRepository } from "../../db/db.repository";
import { User } from "../model/user.model";
import { UserRepoInterface } from "./user.repository.interface";

export class UserMysqlRepository implements UserRepoInterface {
  constructor(private readonly dbRepository: DbRepository) {}

  async getHashedPasswordByEmail(email: string): Promise<string> {
    const res = await this.dbRepository.executeQuery(
      "select hashed_password from user where email = ?",
      [email]
    );
    return res[0]?.hashed_password;
  }
  async create(data: User): Promise<any> {
    try {
      const { name, email, hashedPassword } = data;
      const res = await this.dbRepository.executeQuery(
        "insert into user (name, email, hashed_password) values (?, ?, ?)",
        [name, email, hashedPassword]
      );
      return res;
    } catch (error) {
      console.error("Error inserting data:", error);
      throw error;
    }
  }
}
