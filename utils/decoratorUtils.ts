import { test } from "@playwright/test";

export function step(message: string) {
  return function actualDecorator(
    originalMethod: any,
    context: ClassMethodDecoratorContext
  ) {
    async function replacementMethod(this: any, ...args: any[]) {
      let text = args.length > 0 ? `with values ${JSON.stringify(args)}` : "";
      await test.step(`${message} ${text}`, async () => {
        return originalMethod.call(this, ...args);
      });
    }
    return replacementMethod;
  };
}
