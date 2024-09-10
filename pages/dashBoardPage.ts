import { Locator, Page } from "@playwright/test";
import * as asserts from "../utils/assertUtils";
import { getLocator } from "../utils/locatorUtils";
import { step } from "../utils/decoratorUtils";
import { fill, goto, click } from "../utils/actionUtils";
import { env } from "../utils/envUtils";
import { MAX_TIMEOUT } from "../utils/timeOutUtils";

export class DashBoardPage {
  readonly page: Page;
  readonly dashBoardHeaderLbl = getLocator(
    '//*[@id="workspace-content"]//span[contains(text(),"Dashboard")]'
  );
  readonly currentDateTimeLbl = getLocator(
    '//*[@id="workspace-content"]//span[contains(text(),"Dashboard")]//following-sibling::span'
  );

  //portal talk admin center
  readonly potalTalkAdminPopup = getLocator(
    '//*[contains(text(),"PortalTalk Admin Center")]'
  );
  readonly standardScreenLbl = getLocator(
    '//*[contains(text(),"Standard Screen")]'
  );
  readonly settingBtn = getLocator('//*[@id="setting-group"]');
  readonly openAdminPageBtn = getLocator(
    '//button[contains(text(), "Open Admin Center")]'
  );

  constructor(page: Page) {
    this.page = page;
  }
  @step("Assert: Dashboard should be displayed")
  async assertDashBoardPageIsDisplayed() {
    await asserts.expectElementToBeVisible(this.dashBoardHeaderLbl, {
      timeout: MAX_TIMEOUT,
    });
  }
  @step("Action: Click on SETTING button")
  async actionClickOnSettingBtn() {
    await click(this.settingBtn);
  }
  @step("Assert: Portaltalk admin popup should be displayed")
  async assertPortalTalkAdminPopupIsDisplayed() {
    await asserts.expectElementToBeVisible(this.potalTalkAdminPopup);
    await asserts.expectElementToBeVisible(this.standardScreenLbl);
    await asserts.expectElementToBeVisible(this.openAdminPageBtn);
  }
  @step("Action: Click on OPEN ADMIN CENTER button")
  async actionClickOnOpenAdminCenterBtn() {
    await click(this.openAdminPageBtn);
  }
  @step("Action: Open admin page")
  async actionOpenAdminPage() {
    await this.actionClickOnSettingBtn();
    await this.assertPortalTalkAdminPopupIsDisplayed();
    await this.actionClickOnOpenAdminCenterBtn();
  }
}
