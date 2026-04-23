 
import { test as baseTest } from '../fixtures/common-fixture';
export const test = baseTest.extend({

    goto: async ({ loginPage }, use) => {

        await loginPage.goto();
        await use();
    },
    logout: async ({ homePage }, use) => {

        await homePage.logout();
        await use();
    }

});

export { expect } from '@playwright/test';
