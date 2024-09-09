import { test, expect } from "@playwright/test";
import { login_ms_tradition } from "../pages/loginPage";

test("traditional POM", async ({ page }) => {
  const loginPage =  new login_ms_tradition(page);
  await loginPage.navigateToHomePage();
});


