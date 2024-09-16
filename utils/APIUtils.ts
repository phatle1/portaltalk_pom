import { delay } from "./actionUtils";
import { getPage } from "./pageUtils";
import fs from "fs";
import dotenv from "dotenv";
import { env } from "../utils/envUtils";
import { resolve } from "path";

export async function saveAuthorizationToEnv(token: string) {
  // Read existing .env file content
  let envContent = "";
  const env = process.env.test_env || "dev";

  const envFilePath = resolve(process.cwd(), `.env.${env}`);
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, "utf8");
  }

  // Remove the existing AUTHORIZATION_TOKEN if it exists
  const updatedEnvContent = envContent
    .split("\n")
    .filter((line) => !line.startsWith("TOKEN="))
    .join("\n");

  // Add the new AUTHORIZATION_TOKEN at the end of the file
  const newEnvContent = `${updatedEnvContent}\nTOKEN=${token}`;

  // Write the updated content to the .env file
  fs.writeFileSync(envFilePath, newEnvContent, "utf8");
  console.log("Authorization token saved to .env");
}

export async function inspectAuthentication(): Promise<string> {
  let authen: any = null;
  getPage().on("request", async (request) => {
    if (
      request.resourceType() === "xhr" ||
      request.resourceType() === "fetch"
    ) {
      if (
        request
          .url()
          .includes(
            "https://portaltalknotificationtrunk.azurewebsites.net/hubs/activityFeed/negotiate"
          )
      ) {
        const header = request.headers();
        authen = header["authorization"];
      }
    }
  });
  await delay(3000);
  await getPage().reload();
  await delay(3000);
  if (authen) {
    authen = authen.split(" ")[1];
    console.log("Authen nè:", authen);
    return authen;
  } else {
    return "";
  }
}
