import mysql, { Pool } from "mysql2/promise";
import { config } from "./mysql2.config";

export const mysqlPool: Pool = mysql.createPool(config);
