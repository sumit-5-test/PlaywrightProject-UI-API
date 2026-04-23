
import { test } from "../../fixtures/common-fixture";

 

test.describe('GitHub E2E Tests', () => {
  //let home, repo;
  const repoName = `pw-repo-${Date.now()}`;
  //const owner = process.env.GITHUB_USER;

  test.beforeEach(async ({ page }) => {

    await page.goto('/');
  });

  test.only('Create and delete repo', async ({ homePage, repoPage, cryptoUtil }) => {
    const dnc = cryptoUtil.decryptData(process.env.GITHUB_USER)

    await homePage.verifyHomePage();

    await repoPage.createRepository(repoName);

    await repoPage.deleteRepository(dnc, repoName);
  });

  test('LOGOUT', async ({ homePage }) => {
    await homePage.logout();
  });
});