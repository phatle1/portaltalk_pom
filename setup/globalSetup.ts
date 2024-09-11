import { FullConfig } from "@playwright/test";
import { loadEnv } from "./loadEnv";

async function globalSetup(config: FullConfig) {
  try {
    loadEnv();
  } catch (error) {
    console.error("Error in loading environment variables", error);
  }
}

export default globalSetup;
