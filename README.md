# PLAYWRIGHT - TYPESCRIPT Automation Frame Work


### Development environment

- Visual Studio Code.
- Playwright


- To install required library.
```zsh
npm init playwright@latest
```

- To install Allure report.
```zsh
npm install --save-dev allure-commandline
npm install --save-dev allure-playwright
or
npm install --save-dev @playwright/test allure-playwright

run -> npx allure serve allure-results
```

- In the playwright.config.ts file:

```zsh
import { testPlanFilter } from "allure-playwright/dist/testplan";

export default defineConfig({
  // ...
  grep: testPlanFilter(),
  reporter: [["line"], ["allure-playwright"]],
});
```

- In the playwright.config.ts file:

```zsh
npm install dotenv @playwright/test
```