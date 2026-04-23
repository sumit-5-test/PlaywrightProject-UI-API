import { test } from '../../fixtures/hooks-fixture';
import { expect } from '../../fixtures/hooks-fixture';

test.describe('Github Homepage Features @homepage @regression',()=>{

test('TC-1: Verify homepage loads correctly @smoke @critical', async ({ goto, homePage, page }) => {

  const isHomePage = await homePage.verifyHomePage();

  await expect(isHomePage).toBeTruthy();

});

test.only('TC-2:Search functionality works @functional @search', async ({ goto, homePage, page }) => {

  await homePage.searchRepository('playwright');
  await expect(page).toHaveURL(/search/);
  await expect(page.getByRole('heading', { name: /search results/i })).toBeVisible();
});

test.skip('TC-03: User menu dropdown works @functional @UI', async ({ goto, homePage, page }) => {

  await homePage.openUserMenu();

  await expect(homePage.userMenu).toBeVisible();


});

test('TC-4: Dashboard feed displays content @ui', async ({ goto, homePage, page }) => {

  const isFeedVisible = await homePage.isFeedVisible();

  expect(isFeedVisible).toBeTruthy();

});

test('TC-5: New repository button is accessible @fuctional', async ({ goto, homePage, page }) => {

  await homePage.createNewRepository();

  await expect(page).toHaveURL(/new/);

});
test('TC-6: Repository list loads correctly  @ui @data', async ({ goto, homePage, page }) => {

  const repoCount = await homePage.getRepositoryCount();

  expect(repoCount).toBeGreaterThanOrEqual(0);

});
});

 

test.describe('Github Home Page responses @responsive @accessibility', () => {

test('TC-7: Verify responsive design @responsive @ui', async ({ goto, homePage, page }) => {

  // Test different viewport sizes

  await page.setViewportSize({ width: 375, height: 667 }); // Mobile

  await expect(homePage.userAvatar).toBeVisible();

  await page.setViewportSize({ width: 768, height: 1024 }); // Tablet

  await expect(homePage.userAvatar).toBeVisible();

  await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop

  await expect(homePage.userAvatar).toBeVisible();

});

test('TC-8: Keyboard navigation accessibility @accessibility @ui', async ({ page, goto, homePage }) => {

  // Tab through interactive elements

  await page.keyboard.press('Tab');

  await expect(page.locator(':focus')).toBeVisible();

  for (let i = 0; i < 5; i++) {

    await page.keyboard.press('Tab');

  }

});
test('TC-9: Page performance check @performance', async ({ page, goto, homePage }) => {

  const performanceTiming = JSON.parse(

    await page.evaluate(() => JSON.stringify(window.performance.timing))

  );

  const loadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;

  expect(loadTime).toBeLessThan(5000); // Load under 5 seconds


});
test('TC-10: Sign out functionality @security', async ({ page, goto, homePage }) => {
  const logoutUrl = process.env.LOG_OUT;
  expect(logoutUrl).toBeDefined();

  await homePage.logout();
  await expect(page).toHaveURL(logoutUrl);

});
})















