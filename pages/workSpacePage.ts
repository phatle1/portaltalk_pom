import { Page } from "@playwright/test";
import * as asserts from "../utils/assertUtils";
import { getLocator } from "../utils/locatorUtils";
import { step } from "../utils/decoratorUtils";
import { fill, goto, click } from "../utils/actionUtils";
import { env } from "../utils/envUtils";
import { MAX_TIMEOUT, STANDARD_TIMEOUT } from "../utils/timeOutUtils";

export class WorkSpacePage {
  readonly page: Page;

  /**Element for MAIN section */
  readonly mangeWorkSpaceLbl = getLocator(
    '//*[contains(@id,"admin-page")]//span[text()="MANAGE WORKSPACES"]'
  );
  readonly configurationIco = getLocator('//*[@id="configuration"]');
  readonly categoryIco = getLocator('//*[@id="CategoryList"]');

  /**Elements for WORKSPACE CATEGORY CONFIGURATION */
  readonly addNewCategoryBtn = getLocator(
    '//*[contains(text(),"Add New Category")]'
  );
  readonly generalSettingIco = getLocator(
    '//button[@title="General Settings"]'
  );

  /**Elements for CATEGORY INFORMATION POPUP */
  readonly categoryNameInp = getLocator(
    '//*[@placeholder="Please enter name of category"]'
  );
  readonly displayOrderInp = getLocator(
    '//*[text()="Display Order"]//following-sibling::span//input'
  );
  readonly selectCategoryTypeDDL = getLocator(
    '//*[text()="Select category type"]/following-sibling::div//button[1]'
  );

  //Elements for CATEGORY SETTING POPUP
  readonly catSettingHeaderLbl = getLocator(
    '//span[contains(text(),"ADD NEW CATEGORY:")]'
  );
  readonly prefixGeneratorDDL = getLocator(
    '//span[contains(text(),"Prefix generator")]'
  );

  /**Elements for MANAGE WORKSPACE TYPES */
  readonly addNewWorkSpaceTypeBtn = getLocator(
    '//button[contains(text(),"Add New Workspace Type")]'
  );

  /**Elements FOR MANAGE METADATA SECTION */

  readonly addNewMetadataBtn = getLocator(
    '//button[contains(text(),"Add New Metadata")]'
  );
  readonly nextStepBtn = getLocator('//button[text()="Next Step"]');
  readonly finishBtn = getLocator('//button[contains(text(),"Finish")]');

  constructor(page: Page) {
    this.page = page;
  }

  /**FUNCTIONS for main section */
  @step("Action: Click on CONFIG ICON")
  async actionClickConfigIco() {
    await click(this.configurationIco, { timeout: MAX_TIMEOUT });
  }
  @step("Action: Click on CATEGoRY ICON")
  async actionClickCategoryIco() {
    await click(this.categoryIco);
  }

  /**ASSERTS for main section */
  @step("Assert: MANAGE WORK SPACE should be displayed")
  async assertManageWorkSpacePageIsDisplayed() {
    await asserts.expectElementToBeVisible(this.mangeWorkSpaceLbl, {
      timeout: STANDARD_TIMEOUT,
    });
  }
  /**End*/

  /**FUNCTIONS for WORKSPACE CATEGORY CONFIGURATION section */
  @step("Action: Click on ADD NEW CATEGORY button")
  async actionClickAddNewCategoryBtn() {
    await click(this.addNewCategoryBtn);
  }
  @step("Action: Click on GENERAL SETTING ICON")
  async actionClickGeneralSettingIco() {
    await click(this.generalSettingIco);
  }

  /**End*/

  /**Functions for CATEGORY INFORMATION POPUP */
  @step("Action: Fill CATEGORY NAME input")
  async actionFillCategoryNameInp(val: string) {
    await fill(this.categoryNameInp, val);
  }
  @step("Action: Fill DISPLAY ORDER input")
  async actionFillDisplayOrderInp(val: string) {
    await fill(this.displayOrderInp, val);
  }
  @step("Action: Select CATEGORY TYPE drop down list")
  async actionSelectCategoryTypeDDL(val: string) {
    await click(this.selectCategoryTypeDDL);
    await click(await this.categoryType(val));
  }

  /**End*/

  /**Asserts for CATEGORY SETTING POPUP */
  @step("Assert: Category header should be displayed")
  async assertCategoryHeaderIsDisplayed(catName: string) {
    await asserts.expectElementToContainText(this.catSettingHeaderLbl, catName);
  }
  @step("Assert: Prefix GEERATOR should be displayed")
  async assertPrefixGeneratorDDLIsDisplayed() {
    await asserts.expectElementToBeVisible(this.prefixGeneratorDDL);
  }
  /**End*/

  //Asserts for Manage Work Space
  @step("Assert: Prefix MANAGE WORK SPACE should be displayed")
  async assertManageWorkSpaceTypeIsDisplayed() {
    await asserts.expectElementToBeVisible(this.addNewWorkSpaceTypeBtn);
  }
  /**End*/

  /**Functions for MANAGE METADATA SECTION*/

  @step("Action: Click on FINISH button")
  async clickOnFinishBtn() {
    await click(this.finishBtn);
  }

  //Assert for MANAGE METADATA SECTION*/
  @step("Assert: ADD NEW METADATA button should be displayed")
  async assertAddNewMetadataBtn() {
    await asserts.expectElementToBeVisible(this.addNewMetadataBtn);
  }
  /**End*/

  /**
   * DYNAMIC ELEMENTS
   */
  // @step("Get DYNAMIC element")
  async categoryType(val: string) {
    return getLocator(
      `//*[contains(@id,"fluent-option") and contains(text(),"${val}")]`
    );
  }

  @step("Action: Click NEXT button")
  async actionClickNextBtn() {
    await click(this.nextStepBtn);
  }

  @step("Action: Fill SELECT CATEGORY FORM")
  async actionFillSelectCatTypeForm(
    catName: string,
    catOrd: string,
    catType: string
  ) {
    catName = catName.toUpperCase();
    await this.actionClickConfigIco();
    await this.actionClickCategoryIco();
    await this.actionClickAddNewCategoryBtn();
    await this.actionFillCategoryNameInp(catName);
    await this.actionFillDisplayOrderInp(catOrd);
    await this.actionSelectCategoryTypeDDL(catType);
    await this.actionClickNextBtn();
    await this.assertCategoryHeaderIsDisplayed(`ADD NEW CATEGORY: ${catName}`);
    await this.actionClickNextBtn();
    await this.assertPrefixGeneratorDDLIsDisplayed();
    await this.actionClickNextBtn();
    await this.assertManageWorkSpaceTypeIsDisplayed();
    await this.actionClickNextBtn();
    await this.assertAddNewMetadataBtn();
    await this.clickOnFinishBtn();
  }
}
