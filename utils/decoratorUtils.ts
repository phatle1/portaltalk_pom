import { test } from "@playwright/test";

export function step(message: string) {
  return function actualDecorator(
    originalMethod: any,
    context: ClassMethodDecoratorContext
  ) {
    async function replacementMethod(this: any, ...args: any[]) {
      await test.step(`${message}`, async () => {
        return originalMethod.call(this, ...args);
      });
    }
    return replacementMethod;
  };
}
