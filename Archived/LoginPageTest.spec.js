
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { RepoPage } from '../pages/RepoPage.js';



test.describe('GitHub E2E Tests', () => {

    test.only('End-to-End Login → Create Repo → Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const repoPage = new RepoPage(page);

     // Generate a unique repository name using timestamp
        const repoName = `playwright-repo-${Date.now()}`;
        await page.context().addCookies(require('../playwright/.auth/loginState.json').cookies);
        await loginPage.goto();

    // Verify login by checking for the presence of the user avatar or home page elements
        await homePage.verifyHomePage();

        // Create Repository
        await repoPage.createRepository(repoName);
         
 
        // Logout
        await homePage.logout();
         
    });

});