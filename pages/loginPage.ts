import { Locator, Page, expect } from "@playwright/test";
import { fill } from "../utils/actionUtils";
import { step } from "../utils/decoratorUtils";

export class login_ms_tradition {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly login: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator(`//input[@type="email"]`);
  }

  @step("Action: navigate to home page")
  async navigateToHomePage() {
    await this.page.goto("https://test.portaltalk.net/");
    await fill(this.userName, "asasdasdas");
    console.log("stop");
  }
}
