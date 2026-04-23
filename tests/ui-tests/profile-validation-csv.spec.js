import { test, expect } from '@playwright/test';
import { readCSV } from '../../utils/ui-utils/profileValidation.js';
import { ProfilePage } from '../../pages/ProfilePage.js';
 
 
const data = readCSV('testData/profileValidation.csv');
 
test.describe('GitHub Profile Validation - CSV DDT', () => {
  for (const row of data) {
    test(`Validate profile: ${row.expectedUsername}`, async ({ page }) => {
      const profile = new ProfilePage(page);
      await page.context().addCookies(require('../../playwright/.auth/loginState.json').cookies);
 
      await profile.gotoProfile(row.profileUrl);

      //await profile.validationProfile(data)
 
      await expect(profile.username).toHaveText(row.expectedUsername);
      await expect(profile.repositoriesTab).toBeVisible();
      
    });
  }
});