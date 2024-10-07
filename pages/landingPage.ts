import { Page } from "@playwright/test";
import * as asserts from "../utils/assertUtils";
import { getLocator, getShadowLocator } from "../utils/locatorUtils";
import { step } from "../utils/decoratorUtils";
import { fill, goto, click } from "../utils/actionUtils";
import { env } from "../utils/envUtils";
// import { authFile } from "../playwright.config";

export class LandingPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Shadow DOM
  readonly userNameTxt = getShadowLocator("mgt-login #login-button .line1");
  readonly emailText = getShadowLocator("mgt-login #login-button .line2");

  @step("Action: navigate to home page")
  async navigateToHomePage() {
    await goto(env.BASE_URL);
  }

  @step("Assert: Email shoud be shown correcly")
  async assertIsEmailDisplayed(email: any) {
    const actualEmail = await this.emailText.textContent();
    await asserts.isEqual(String(actualEmail), email);
  }
}
