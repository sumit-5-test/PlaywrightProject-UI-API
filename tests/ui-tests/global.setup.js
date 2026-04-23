 
import { test } from "../../fixtures/common-fixture";
import { expect } from "@playwright/test";

 

test('Global Setup for Auto Login',async({page,loginPage,homePage,cryptoUtil})=>{

const decryptedUsername=cryptoUtil.decryptData(process.env.GITHUB_USER);
const decryptedPassword=cryptoUtil.decryptData(process.env.GITHUB_PASS);
await loginPage.goto(process.env.BASE_URL);
await loginPage.login(decryptedUsername,decryptedPassword);
//await page.waitForURL(process.env.BASE_URL);
await expect(homePage.homeText).toHaveText('Home');
await page.context().storageState({

    path: './playwright/.auth/global.json'
})


})