export const preset = 'jest-playwright-preset';
export const testRunner = 'jest-circus/runner';
export const reporters = [
    'default',
    ['jest-allure', { outputDirectory: 'allure-results' }]
];
export const setupFilesAfterEnv = ['./jest.setup.js'];