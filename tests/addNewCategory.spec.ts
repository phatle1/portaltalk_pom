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
import { chromium } from "@playwright/test";
import {
  inspectAuthentication,
  saveAuthorizationToEnv,
} from "../utils/APIUtils";
import * as dbConn from "../setup/DBSetup";
import * as appCatDAO from "../database/DAO/applicationCategoriesDAO";

test.describe.parallel("Smoke test suite", () => {
  // test.use({ storageState: authFile });

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
    await inspectAuthentication();
    await loginPage.login(env.USERNAME, env.PWD);
    const authen = await inspectAuthentication();
    await saveAuthorizationToEnv(authen);
    await getPage().reload();
    const new_au = env.TOKEN;
    await dashBoardPage.assertDashBoardPageIsDisplayed();
    await dashBoardPage.actionOpenAdminPage();
    await workSpacePage.actionFillSelectCatTypeForm(
      catName,
      catOrd,
      catType,
      prefix
    );
    
    await workSpacePage.actionDeleteCategoryByUsingAPI(catName);
  });
});
