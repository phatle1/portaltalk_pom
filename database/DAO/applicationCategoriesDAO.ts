import { connectToDatabase } from "../../database/connect/dbConnection";

const getAllCat = 'SELECT TOP (1) * FROM [dbo].[ApplicationCategories]'
async function qCatIdByName(val: string) {
  return `SELECT id, ccnCustomerid, categorytype,position FROM [dbo].[ApplicationCategories] where Name = '${val}'`;
}

export async function getCatIdByName(val: string): Promise<any> {
  try {
    const dbConnection = await connectToDatabase();
    if (dbConnection) {
      const result = await dbConnection
        .request()
        .query(await qCatIdByName(val.toUpperCase()));
      return result.recordset;
    } else {
      console.error("Failed to get database connection.");
    }
  } catch (err) {
    console.error("Error using the database connection:", err);
  }
}
