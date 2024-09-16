import { Page } from "@playwright/test";
import * as asserts from "../utils/assertUtils";
import { getLocator } from "../utils/locatorUtils";
import { step } from "../utils/decoratorUtils";
import {
  fill,
  click,
  scroll,
  scrollDownByKeyboardUntilElement,
  scrollDownToBottom,
  waitForElementIsPresent,
  delay,
} from "../utils/actionUtils";
import { MAX_TIMEOUT, STANDARD_TIMEOUT } from "../utils/timeOutUtils";
import { getPage } from "../utils/pageUtils";

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
    '//span[contains(text(),"ADD NEW CATEGORY")]'
  );
  readonly prefixGeneratorDDL = getLocator(
    '//span[contains(text(),"Prefix generator")]'
  );
  readonly prefixGeneratorInp = getLocator(
    // '//*[contains(text(),"Prefix generator")]/parent::div/following-sibling::div//input[contains(@id,"TextField")]'
    '//input[contains(@id,"TextField")]'
  );

  readonly exampleNameTxt = getLocator(
    '(//input[contains(@id,"TextField")]//ancestor::div[contains(@class,"pt-text-field-container")]//following::div[3])[1]'
  );

  /**Elements for MANAGE WORKSPACE TYPES */
  readonly addNewWorkSpaceTypeBtn = getLocator(
    '//button[contains(text(),"Add New Workspace Type")]'
  );

  /**Elements for MANAGE METADATA SECTION */

  readonly addNewMetadataBtn = getLocator(
    '//button[contains(text(),"Add New Metadata")]'
  );
  readonly nextStepBtn = getLocator('//button[text()="Next Step"]');
  readonly finishBtn = getLocator('//button[contains(text(),"Finish")]');

  readonly loadingTxt = getLocator('//div/span[contains(text(),"LOADING")]');
  readonly catCreatedSuccessfullyTxt = getLocator(
    '//span[contains(text(),"The Category created successfully")]'
  );

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * DYNAMIC ELEMENTS
   */
  // @step("Get DYNAMIC element")
  async categoryType(val: string) {
    return getLocator(
      `//*[contains(@id,"fluent-option") and contains(text(),"${val}")]`
    );
  }
  //this element is in plant text form, use this for JS selector
  async getAddedCategoryFromTable(catName: string) {
    return `//div[contains(@class,"ScrollablePane")]//div[@role="gridcell"][3]//span[contains(text(),"${catName}")]`;
    // return `//span[contains(text(),"${catName}")]`;
  }

  async getEditDeleteButtonBasedOnCatName(catName: string) {
    return `//span[contains(text(),"${catName}")]//ancestor::div[@data-automationid="ListCell"]//button`;
  }

  readonly editBtn = '//span[contains(text(),"Edit")]';
  readonly removeBtn = '//span[contains(text(),"Remove")]';

  readonly firstItemOfTable =
    "//div[@role='presentation' and @class='ms-DetailsList-contentWrapper']//div[@data-list-index='0']";

  readonly scrollableElementInsideCategoryTable =
    'div[data-is-scrollable="true"]';

  readonly catNameOnRemoveConfirmationPopup =
    '//div[contains(text(),"Remove Category")]//following-sibling::div//span';

  readonly yesRemoveCatNameOnRemoveConfirmationPopup =
    "//button[contains(text(),'Yes, Remove')]";

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

  /**Functions for CATEGORY SETTING POPUP */
  @step("Action: Click on PREFIX GENERATOR dropdown")
  async actionClickOnPrefixDDL() {
    await click(this.prefixGeneratorDDL);
  }
  @step("Action: Fill on PREFIX GENERATOR dropdown")
  async actionFillOnPrefixInp(prefixGen: string) {
    await fill(this.prefixGeneratorInp, prefixGen);
  }

  /**End*/

  /**Asserts for CATEGORY SETTING POPUP */
  @step("Assert: Category header should be displayed")
  async assertCategoryHeaderIsDisplayed(catName: string) {
    await asserts.expectElementToContainText(this.catSettingHeaderLbl, catName);
  }
  @step("Assert: Prefix GENERATOR should be displayed")
  async assertPrefixGeneratorDDLIsDisplayed() {
    await asserts.expectElementToBeVisible(this.prefixGeneratorDDL);
  }

  @step("Assert: WORKSPACE PREFIX EXAMPLE should be displayed")
  async assertPrefixExampleNameIsDisplayed(name: string) {
    await asserts.expectElementToContainText(this.exampleNameTxt, name);
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

  @step("Assert: The new Category should be added to the table")
  async assertNewCategoryIsAdded(catName: string) {
    // await asserts.expectElementToBeVisible(this.firstItemOfTable);
    // await waitForElementIsPresent(this.firstItemOfTable);
    await click(this.firstItemOfTable);
    await scrollDownByKeyboardUntilElement(
      await this.getAddedCategoryFromTable(catName),
      this.scrollableElementInsideCategoryTable
    );
    await asserts.expectElementToBeVisible(
      await this.getAddedCategoryFromTable(catName)
    );
  }

  @step("Assert: LOADING popup should be displayed")
  async assertLoadingPopupIsDisplayed() {
    await asserts.expectElementToBeVisible(this.loadingTxt);
  }

  @step("Assert: The new Category should be added to the table")
  async assertAddNewCatTxtIsDisplayed() {
    await asserts.expectElementToBeVisible(this.catCreatedSuccessfullyTxt);
  }

  //Remove confirmation popup assertion
  @step(
    "Assert: The confirmation message should contains a valid Category Name"
  )
  async assertNewCatNameIsDisplayedOnTheConfirmPopup(catName: string) {
    await asserts.expectElementToContainText(
      this.catNameOnRemoveConfirmationPopup,
      catName
    );
  }

  @step("Assert: The inputted data has been removed successfully")
  async assertNewCatNameIsNotDisplayedTbl(catName: string) {
    await asserts.expectElementNotToBeAttached(catName);
  }

  @step("Action: Click NEXT button")
  async actionClickNextBtn() {
    await click(this.nextStepBtn);
  }

  @step("Action: Click EDIT button")
  async actionClickEditBtn() {
    await click(this.editBtn);
  }

  @step("Action: Click Remove button")
  async actionClickRemoveBtn() {
    await click(this.removeBtn);
  }
  @step("Action: Click Yes, Remove category by name button")
  async actionClickYesRemoveCatNameOnRemoveConfirmationPopup() {
    await click(this.yesRemoveCatNameOnRemoveConfirmationPopup);
  }
  @step("Action: Click on Edit/Delete button base on Category name")
  async actionClickEditDeleteBtnBasedOnCatName(CatName: string) {
    await click(await this.getEditDeleteButtonBasedOnCatName(CatName));
  }

  @step("Action: Delete a Category bases on category name")
  async actionDeleteCategoryByName(catName: string) {
    await this.actionClickEditDeleteBtnBasedOnCatName(catName);
    await this.actionClickRemoveBtn();
    await this.assertNewCatNameIsDisplayedOnTheConfirmPopup(catName);
    await this.actionClickYesRemoveCatNameOnRemoveConfirmationPopup();
    await scrollDownToBottom(this.scrollableElementInsideCategoryTable);
    await this.assertNewCatNameIsNotDisplayedTbl(
      await this.getAddedCategoryFromTable(catName)
    );
  }

  @step("Action: Fill 'ADD NEW CATEGORY' form")
  async actionFillAddNewCatForm(
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
  }

  @step("Action: Fill 'CATEGORY SETTINGS' form")
  async actionFillCatSettingsForm(catName: string, prefix: string) {
    await this.assertCategoryHeaderIsDisplayed(`ADD NEW CATEGORY: ${catName}`);
    await this.assertPrefixGeneratorDDLIsDisplayed();
    await this.actionClickOnPrefixDDL();
    await this.actionFillOnPrefixInp(prefix);
    await this.assertPrefixExampleNameIsDisplayed(prefix);
    await this.actionClickNextBtn();
  }

  @step("Action: Fill 'MANAGE WORKSPACE TYPES' form")
  async actionFillManageWorkspaceTypeForm() {
    await this.assertManageWorkSpaceTypeIsDisplayed();
    await this.actionClickNextBtn();
  }

  @step("Action: Fill 'MANAGE METADATA' form")
  async actionFillManageMetadataForm() {
    await this.assertAddNewMetadataBtn();
  }

  @step("Action: Fill SELECT CATEGORY FORM")
  async actionFillSelectCatTypeForm(
    catName: string,
    catOrd: string,
    catType: string,
    prefix: string
  ) {
    await this.actionFillAddNewCatForm(catName, catOrd, catType);
    await this.actionFillCatSettingsForm(catName, prefix);
    await this.actionFillManageWorkspaceTypeForm();
    await this.actionFillManageMetadataForm();
    await this.clickOnFinishBtn();
    await this.assertLoadingPopupIsDisplayed();
    await this.assertAddNewCatTxtIsDisplayed();
    // await this.assertNewCategoryIsAdded(catName);
  }
}
