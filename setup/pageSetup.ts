/**
 * page-setup.ts: This module is responsible for setting up the initial state of a page before each test.
 * It includes a hook that runs before each test, setting the page context. By centralizing these setup operations,
 * it ensures a consistent starting point for each test, improving test reliability. It also exports a base test object
 * with a beforeEach hook already set up. This can be used to define tests with the page context set up.
 */

import { Page, test as baseTest } from "@playwright/test";
import { getPage, setPage } from "../utils/pageUtils";
import { LoginPage } from "../pages/loginPage";
import { DashBoardPage } from "../pages/dashBoardPage";
import { WorkSpacePage } from "../pages/workSpacePage";
import { authFile } from "../playwright.config";
import { env } from "../utils/envUtils";

/**
 * A hook that runs before each test, setting the page context.
 * @param {Page} page - The page context provided by Playwright.
 */
baseTest.beforeEach(({ page }: { page: Page }) => {
  setPage(page);
});

type MyFixtures = {
  loginPage: LoginPage;
  dashBoardPage: DashBoardPage;
  workSpacePage: WorkSpacePage;
};

/**
 * The base test object with a beforeEach hook already set up.
 * This can be used to define tests with the page context set up.
 */
export const test = baseTest.extend<MyFixtures>({
  // loginPage: async ({ browser }, use) => {
  //   const context = await browser.newContext({ storageState: authFile });
  //   const page = await context.newPage();
  //   const loginPage = new LoginPage(page);
  //   await loginPage.login(env.USERNAME, env.PWD);
  //   await use(loginPage);
  //   await context.close();
  // },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashBoardPage: async ({ page }, use) => {
    const dashBoardPage = new DashBoardPage(page);
    await use(dashBoardPage);
  },
  workSpacePage: async ({ page }, use) => {
    const workSpacePage = new WorkSpacePage(page);
    await use(workSpacePage);
  },
});
