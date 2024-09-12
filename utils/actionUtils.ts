require("dotenv").config();
import { Locator } from "playwright";
import { ClickOptions, FillOptions, GotoOptions } from "../setup/options";
import { LOADSTATE } from "../playwright.config";
import { getPage } from "./pageUtils";
import { getLocator } from "./locatorUtils";
import { MAX_TIMEOUT, MIN_TIMEOUT } from "./timeOutUtils";
import * as asserts from "../utils/assertUtils";
import { isElementDisplayed } from "../utils/assertUtils";
import { expect } from "@playwright/test";

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

export async function scrollDownToBottom(scrollableElement: string) {
  let canScrollDown = true;
  // while (canScrollDown) {
  canScrollDown = await getPage().evaluate((scrollableElement) => {
    const element = document.querySelector(scrollableElement);
    if (!element) return false; // If the element doesn't exist, return false

    const initialScrollTop = element.scrollTop;
    element.scrollTop += element.clientHeight; // Scroll down by the height of the visible area

    return element.scrollTop > initialScrollTop; // Check if scrolling is possible
  }, scrollableElement);

  return canScrollDown;
  // }
  // return canScrollDown;
}

export async function scrollDownByKeyboardUntilElement(
  selectorTofocus: string,
  selectorToFind: string,
  scrollableElement: string //this parameter should be located by CSS
) {
  let isScroll = true;
  while (isScroll) {
    await scrollDownToBottom(scrollableElement);
    const isDisplayed = await isElementDisplayed(selectorToFind);
    if (isDisplayed) {
      isScroll = false
    }
    try {
    } catch (error) {
      await scrollDownToBottom(scrollableElement);
    }
  }
}

// back up
// export async function scrollDownByKeyboardUntilElement(
//   selectorTofocus: string,
//   selectorToFind: string,
//   scrollableElement: string //this parameter should be located by CSS
// ) {
//   let isScrollAble = true
//   while (!(await getPage().locator(selectorToFind).isVisible())) {
//     // await getPage().locator(scrollableElement).click();
//     // await getPage().keyboard.press("PageDown");
//     const tempScroll = scrollDownToBottom(scrollableElement);
//     await delay(50);
//   }
// }

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
