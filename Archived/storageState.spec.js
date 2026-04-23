import{test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';


test.describe('GitHub Storage State Tests', () => {

    test('Login and Save Storage State', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);    

        await loginPage.goto();
        await loginPage.login(
            process.env.GITHUB_USER,
            process.env.GITHUB_PASS
        );

        await homePage.verifyHomePage();

        // Save storage state to a file
        await page.context().storageState({ path: 'playwright/.auth/loginState.json' });
    });

    test.only('Load Storage State and Verify Login', async ({ page }) => {
        // Load storage state from the file
        await page.context().addCookies(require('../playwright/.auth/loginState.json').cookies);
        await page.goto('https://github.com');      
        const homePage = new HomePage(page);
        await homePage.verifyHomePage();
        await page.waitForTimeout(2000); // Wait for 2 seconds to visually confirm login state
    });

});