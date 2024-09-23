import test from "@playwright/test";
import { delay } from "./actionUtils";
import { getPage } from "./pageUtils";
import fs from "fs";
import { resolve } from "path";
import { request } from "playwright";

export async function getAndSaveAuthentication(): Promise<any> {
  try {
    const tenantID = "2cd51ada-83c6-489c-ac43-a932277a4dfd";
    const clientID = "c66c39a8-cfa7-4799-bb89-d9851c2fa619";
    const clientSecret = "1bMxMur7rEW33CwV8u5b3eACufHGy06mVjPsQQzklz4=";
    const url =
      `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/token`;
    const oauth2Request = {
      "grant_type": "client_credentials",
      "client_id": "c66c39a8-cfa7-4799-bb89-d9851c2fa619",
      "client_secret": "1bMxMur7rEW33CwV8u5b3eACufHGy06mVjPsQQzklz4=",
      "scope": "https://test.portaltalk.net/.default"
    };
    const apiRequestContext = await request.newContext();
    const response = await apiRequestContext.post(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // data: JSON.stringify(oauth2Request),
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'c66c39a8-cfa7-4799-bb89-d9851c2fa619',
        client_secret: '1bMxMur7rEW33CwV8u5b3eACufHGy06mVjPsQQzklz4=',
        scope: 'https://test.portaltalk.net/.default'
      }).toString()
    });
    const responseBody = await response.json();
    return responseBody.access_token;
  } catch (error) {
    console.log(`Failed to get Access Token: ${error}`);
  }
}

export async function saveAuthorizationToEnv(token: string): Promise<boolean> {
  try {
    let envContent = "";
    const env = process.env.test_env || "dev";
    const envFilePath = resolve(process.cwd(), `.env.${env}`);

    await test.step(`envFilePath: ${envFilePath}`, async () => {});
    await test.step(`authen: ${token}`, async () => {});
    if (fs.existsSync(envFilePath)) {
      envContent = fs.readFileSync(envFilePath, "utf8");
    }
    const updatedEnvContent = envContent
      .split("\n")
      .filter((line) => !line.startsWith("TOKEN="))
      .join("\n");
    const newEnvContent = `${updatedEnvContent}\nTOKEN=${token}`;
    fs.writeFileSync(envFilePath, newEnvContent, "utf8");
    return true;
  } catch (error) {
    console.log(`An error occurs: ${error}`);
    return false;
  }
}

export async function inspectAuthentication(): Promise<string> {
  try {
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
    await getPage().waitForLoadState("networkidle");
    await delay(3000);
    if (authen) {
      authen = authen.split(" ")[1];
      console.log("Authen:", authen);
      return authen;
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
}

export async function sendPostApiRequest(
  url: string,
  method: string,
  data: any | null = null,
  token: any
): Promise<any> {
  try {
    const apiRequestContext = await request.newContext();
    const response = await apiRequestContext.post(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    });
    if (!response.ok()) {
      throw new Error("Network response was not ok");
    }
    const responseData: Response = await response.json();
    return responseData;
  } catch (error) {}
}
