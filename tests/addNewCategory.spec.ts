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
    const catName = `auto_category${randomNumber}`.toUpperCase();
    const catOrd = getRandomNumber(1);
    const catType = "Microsoft Team";
    const prefix = `auto_prefix${randomNumber}`;
    await loginPage.login(env.USERNAME, env.PWD);
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
