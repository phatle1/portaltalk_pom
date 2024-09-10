import { Page } from "@playwright/test";
import * as asserts from "../utils/assertUtils";
import { getLocator } from "../utils/locatorUtils";
import { step } from "../utils/decoratorUtils";
import { fill, goto, click } from "../utils/actionUtils";
import { env } from "../utils/envUtils";
// import { authFile } from "../playwright.config";

export class LoginPage {
  readonly page: Page;
  readonly userNameInp = getLocator('//input[@type="email"]');
  readonly passWordInp = getLocator('//input[@type="password"]');
  readonly accountLbl = getLocator('//*[@id="displayName"]');
  readonly submitbtn = getLocator('//input[@type="submit"]');
  readonly yesBtn = getLocator('//*[@value="Yes"]');

  constructor(page: Page) {
    this.page = page;
  }

  @step("Action: navigate to home page")
  async navigateToHomePage() {
    await goto(env.BASE_URL);
  }

  @step("Action: input User Name to Input field")
  async inputUserName(userName: string | any) {
    await fill(this.userNameInp, userName);
  }

  @step("Action: input Password to Input field")
  async inputPassword(pwd: string | any) {
    await fill(this.passWordInp, pwd);
  }

  @step("Action: click NEXT button")
  async clickNextBtn() {
    await click(this.submitbtn);
  }

  @step("Action: click YES button")
  async clickYestBtn() {
    await click(this.yesBtn);
  }

  @step("Assert: User Name label should be shown")
  async assertIsUserNameDisplayed(userName: string | any) {
    await asserts.expectElementToContainText(this.accountLbl, userName);
  }

  @step("Action: Fill login form")
  async login(userName: any, pwd: any) {
    await this.navigateToHomePage();
    await this.inputUserName(userName);
    await this.clickNextBtn();
    await this.assertIsUserNameDisplayed(userName);
    await this.inputPassword(pwd);
    await this.clickNextBtn();
    await this.clickYestBtn();
    // await this.page.context().storageState({ path: authFile });
  }
}
