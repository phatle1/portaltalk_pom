import * as sql from "mssql";
import * as fs from "fs";
import { promises } from "dns";

const sqlConfig = {
  user: "EsCcnPortal",
  password: "Elephant12",
  server: "br7xlhkcoz.database.windows.net",
  database: "ManagementDatabaseTrunk",
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: true, // For self-signed certificates
  },
};

export async function connectToDatabase(query: string): Promise<any> {
  try {
    // const pool = await sql.connect(sqlConfig);
    const pool = await new sql.ConnectionPool(sqlConfig).connect();
    const sqlQuery = "SELECT TOP (1) * FROM [dbo].[ApplicationCategories]";
    const result = await pool.request().query(sqlQuery);
    // const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}

export async function getCatbyname(): Promise<any> {
  try {
    // let pool = await sql.connect(sqlConfig);
    let pool = await new sql.ConnectionPool(sqlConfig).connect();
    const sqlQuery = "SELECT TOP (1) * FROM [dbo].[ApplicationCategories]";
    let result = await pool.request().query(sqlQuery);
    console.log("result: " + result);
    return result;
  } catch (error) {
    console.log("Errors: " + error);
  }
}
