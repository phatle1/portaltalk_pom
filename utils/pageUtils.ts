import { Page } from "@playwright/test";
export async function waitForPageLoad(
  page: Page,
  state: "load" | "domcontentloaded" | "networkidle" = "load"
) {
  await page.waitForLoadState(state);
}

let page: Page;

/**
 * Returns the current Page.
 * @returns {Page} The current Page.
 */
export function getPage(): Page {
  return page;
}

/**
 * Sets the current Page.
 * @param {Page} pageInstance - The Page instance to set as the current Page.
 */
export function setPage(pageInstance: Page): void {
  page = pageInstance;
}
