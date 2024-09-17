// db/dbConnection.js
import * as sql from "mssql";
import { dbconfig } from "../../database/config/dbConfig";

let pool: sql.ConnectionPool | null = null;

export async function connectToDatabase(): Promise<sql.ConnectionPool | undefined> {
  if (!pool) {
    try {
      pool = await new sql.ConnectionPool(dbconfig).connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Database connection failed:", err);
      return undefined; // Ensure a value is returned in case of an error
    }
  }
  return pool;
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    if (pool) {
      await pool.close();
      console.log("Database connection closed");
    }
  } catch (err) {
    console.error("Error closing the database connection:", err);
  }
}
