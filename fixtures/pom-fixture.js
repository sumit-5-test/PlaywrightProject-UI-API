import{test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { RepoPage } from '../pages/RepoPage.js';   
 
export const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    const loginPage= new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  repoPage: async ({ page }, use) => {
    const repoPage = new RepoPage(page);
    await use(repoPage);
  } ,   

   
});

export { expect } from '@playwright/test';