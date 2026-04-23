
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import * as fs from 'fs';


//test.describe('GitHub E2E Tests', () => {
 
    const filePath = 'testData/loginData.json';
    const testData = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
  // Data-driven test for invalid logins
  for(const data of testData){
    
     test(`Invalid Login Test - ${data.description || 'invalid credentials' }`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(data.username, data.password);
 
      await expect(loginPage.errorMsg).toBeVisible();
    });
}

//})