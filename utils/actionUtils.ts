import { Locator, Page } from "@playwright/test";
import { waitForPageLoad } from "./pageUtils";
import { getLocator } from "./locatorUtils";
import { LOADSTATE } from "../playwright.config";
import { ClickOptions, FillOptions } from "../setup/options";

export async function fill(
  input: string | Locator,
  value: string,
  options?: FillOptions
): Promise<void> {
  const locator = getLocator(input);
  await locator.fill(value, options);
}
