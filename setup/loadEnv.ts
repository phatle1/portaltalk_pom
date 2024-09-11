import dotenv from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

export function loadEnv() {
  const env = process.env.test_env || "dev";

  const envFilePath = resolve(process.cwd(), `.env.${env}`);

  if (existsSync(envFilePath)) {
    console.log(`Loading environment variables from ${envFilePath}`);
    dotenv.config({ path: envFilePath, override: true });
  } else {
    console.warn(
      `Environment file ${envFilePath} not found, loading default .env file`
    );
    dotenv.config(); // Fallback to default .env file
  }
}
