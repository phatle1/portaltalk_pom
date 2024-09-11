require('dotenv').config();
import { LoginPage } from "../pages/loginPage";
import { env } from "../utils/envUtils";
import { test } from "../setup/pageSetup";
import { getRandomNumber } from "../utils/randomUtils";
import * as timeOut from "../utils/timeOutUtils";
import { authFile } from "../playwright.config";

test.describe.parallel("Smoke test suite", () => {
  // test.use({ storageState: authFile });

  test("Add new category", async ({
    loginPage,
    dashBoardPage,
    workSpacePage,
  }) => {
    // test.setTimeout(timeOut.TEST_TIMEOUT);
    const randomNumber = getRandomNumber(5);
    await loginPage.login(env.USERNAME, env.PWD);
    await dashBoardPage.assertDashBoardPageIsDisplayed();
    await dashBoardPage.actionOpenAdminPage();
    await workSpacePage.actionFillSelectCatTypeForm(
      `auto_category${randomNumber}`,
      "1",
      "Microsoft Team",
      `auto_prefix${randomNumber}`
    );
  });
});
