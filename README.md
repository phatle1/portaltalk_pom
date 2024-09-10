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

- Install dotenv to config the Framework to run on multiple env

```zsh
npm install dotenv @playwright/test
npm install --save-dev cross-env
```

- Install cross-env

```zsh
npm install --save-dev cross-env
```