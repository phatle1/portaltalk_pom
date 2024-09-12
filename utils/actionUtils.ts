require("dotenv").config();
import { Locator } from "playwright";
import { ClickOptions, FillOptions, GotoOptions } from "../setup/options";
import { LOADSTATE } from "../playwright.config";
import { getPage } from "./pageUtils";
import { getLocator } from "./locatorUtils";
import { MAX_TIMEOUT } from "./timeOutUtils";
import * as asserts from "../utils/assertUtils";
import { isElementDisplayed } from "../utils/assertUtils";

export async function goto(
  url: string | any,
  options: GotoOptions = { waitUntil: LOADSTATE }
): Promise<void> {
  await getPage().goto(url);
}

export async function click(
  selector: string | Locator,
  options?: ClickOptions
): Promise<void> {
  const locator = getLocator(selector);
  await locator.click(options);
}

export async function fill(
  selector: string | Locator,
  text: string,
  options?: FillOptions
): Promise<void> {
  const locator = getLocator(selector);
  await locator.fill(text, options);
}

export async function focus(selector: string | Locator): Promise<void> {
  const locator = getLocator(selector);
  await locator.focus();
}

export async function scroll(selector: string | Locator): Promise<void> {
  const locator = getLocator(selector);
  await locator.scrollIntoViewIfNeeded({ timeout: MAX_TIMEOUT });
}

export async function scrollByMouseWheel(
  selector: string | Locator
): Promise<void> {
  const locator = getLocator(selector);
}

export async function scrollByQuerySelector(selector: string) {
  const element = document.querySelector(selector);
  if (element !== null) {
    element.scrollIntoView();
  }
}

export async function scrollUntilElement(
  selectorTofocus: string,
  selectorToFind: string
) {
  let isScroll = true;
  let maxScroll = 1;
  while (maxScroll < 5) {
    try {
      const innerFrame = getPage().frame("//div[@data-is-scrollable='true']");
      if (innerFrame) {
        innerFrame.focus;
      }

      const tempElement = getPage().locator(selectorTofocus);
      await focus(tempElement);
      // await getPage().evaluate(
      //   "window.scrollTo(0, document.body.scrollHeight)"
      // );
      await getPage().mouse.wheel(0, 100);
      const isDisplayed = await getPage().locator(selectorToFind).isVisible();
      maxScroll++;
      if (isDisplayed) {
        break;
      }
      await delay(1000);
    } catch (error) {}
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
