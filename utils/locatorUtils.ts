/**
 * locator-utils.ts: This module provides utility functions for handling and manipulating locators in Playwright.
 * These utilities make it easier to interact with elements on the page, providing a layer of abstraction over Playwright's built-in locator methods.
 */

import { FrameLocator, Locator, selectors } from '@playwright/test';
import { getPage } from './pageUtils';
import {
  GetByPlaceholderOptions,
  GetByRoleOptions,
  GetByRoleTypes,
  GetByTextOptions,
  LocatorOptions,
} from '../setup/options';

/**
 * 1. Locators: This section contains functions and definitions related to locators.
 * Locators are used to find and interact with elements on the page.
 */

/**
 * Returns a Locator object based on the input provided.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {LocatorOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocator(input: string | Locator, options?: LocatorOptions): Locator {
  return typeof input === 'string' ? getPage().locator(input, options) : input;
}
