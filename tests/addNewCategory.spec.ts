import { LoginPage } from "../pages/loginPage";
import { env } from "../utils/envUtils";
import { test } from "../setup/pageSetup";
import {
  getRandomNumber,
  getRandomNumberWithSpecificDigit,
} from "../utils/randomUtils";
import * as timeOut from "../utils/timeOutUtils";
import { authFile } from "../playwright.config";
import { getPage } from "../utils/pageUtils";

test.describe.parallel("Smoke test suite", () => {
  // test.use({ storageState: authFile });


  test('capture API information from network events', async ({ page }) => {
    // Listen for all network requests
    let headers:object|null = null
    let body:string|null = null
    await page.goto('https://test.portaltalk.net/');
    page.on('request', request => {
      console.log('>> Request:', request.method(), request.url());
      console.log('>> Request Headers:', request.headers());
    });
  
    // Listen for all network responses
    page.on('response', async response => {
      console.log('<< Response:', response.status(), response.url());
       headers = response.headers();
      console.log('<< Response Headers:', headers);
  
      // If you need to extract specific information, you can do so here
      if (response.url().includes('https://test.portaltalk.net/api/cup/getsettings')) {
         body = await response.text();
        console.log('<< Response Body:', body);
      }
    });
  
    await page.goto('https://test.portaltalk.net/');
    // Perform actions that trigger network requests
  });

  test("Add new category", async ({
    loginPage,
    dashBoardPage,
    workSpacePage,
  }) => {
    // test.setTimeout(timeOut.TEST_TIMEOUT);
    const randomNumber = getRandomNumberWithSpecificDigit(5);
    const catName = `auto_category${randomNumber}`.toUpperCase();
    const catOrd = getRandomNumber(3);
    const catType = "Microsoft Team";
    const prefix = `auto_prefix${randomNumber}`;
    await loginPage.login(env.USERNAME, env.PWD);
    let status:number | null = null
    let url:string | null = null
    const test = getPage().on('response', async response => console.log('<<', status=response.status(), url=response.url(), await response.allHeaders()));
    await dashBoardPage.assertDashBoardPageIsDisplayed();
    await dashBoardPage.actionOpenAdminPage();
    await workSpacePage.actionFillSelectCatTypeForm(
      catName,
      catOrd,
      catType,
      prefix
    );
  });
});
