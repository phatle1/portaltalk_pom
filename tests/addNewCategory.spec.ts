// import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { env } from "../utils/envUtils";
import { test } from "../setup/pageSetup";
import { getRandomNumber } from "../utils/randomUtils";
import * as timeOut from "../utils/timeOutUtils"

test("Add new category", async ({ loginPage, dashBoardPage, workSpacePage }) => {
  test.setTimeout(timeOut.TEST_TIMEOUT);
  const randomNumber = getRandomNumber(5);
  await loginPage.navigateToHomePage();
  await loginPage.fillLoginForm(env.USERNAME, env.PWD);
  await dashBoardPage.assertDashBoardPageIsDisplayed();
  await dashBoardPage.actionOpenAdminPage();
  await workSpacePage.actionFillSelectCatTypeForm(
    `automation${randomNumber}`,
    "1",
    "Microsoft Team",
  );
});
