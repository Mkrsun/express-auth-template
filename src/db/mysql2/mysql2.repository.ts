import { mysqlPool } from "./mysql2.pool";
import { DbRepository } from "../db.repository";

export class Mysql2Repository implements DbRepository {
  executeQuery = async (query: string, values: any[]): Promise<any> => {
    try {
      const [rows] = await mysqlPool.execute(query, values);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Server internal error");
    }
  };
}
