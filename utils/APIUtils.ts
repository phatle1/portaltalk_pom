import test from "@playwright/test";
import { delay } from "./actionUtils";
import { getPage } from "./pageUtils";
import fs from "fs";
import { resolve } from "path";
import { request } from "playwright";

export async function saveAuthorizationToEnv(token: string): Promise<boolean> {
  try {
    let envContent = "";
    const env = process.env.test_env || "dev";
    const envFilePath = resolve(process.cwd(), `.env.${env}`);
  
    await test.step(`envFilePath: ${envFilePath}`, async () => {
      
    });
    await test.step(`authen: ${token}`, async () => {
      
    });
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

// export async function sendApiRequest(url: string, method: string, data: any = null, token: any): Promise<any> {
//   const options: RequestInit = {
//     method: method,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }

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
    await test.step(`response.ok()? : ${response.ok()}`, async () => {
      
    });
    if (!response.ok()) {
      throw new Error("Network response was not ok");
    }
    await test.step(`response.status(): ${response.status()}`, async () => {});
    await test.step(`response.text(): ${response.text()}`, async () => {});
    const responseData: Response = await response.json();
    return responseData;
  } catch (error) {}
}
