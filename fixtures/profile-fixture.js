import { test as base } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage.js';

export const test = base.extend({
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});

export { expect } from '@playwright/test';
