// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 10000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[['allure-playwright',{outputFolder:'my-allure-results'}],['html',{open:'always'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
     
  baseURL: 'https://github.com',
  viewport: { width: 1280, height: 720 },
  
 //storageState: process.env.STORAGE_STATE || 'playwright/.auth/loginState.json',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot:'on',
    trace:'on',
     
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name:'Setup',
      testMatch:'global.setup.js'
    },
    {
      name: 'chromium',
      dependencies:['Setup'],
      testDir: './tests/ui-tests',
      use: { ...devices['Desktop Chrome'],
        storageState:'./playwright/.auth/global.json',
      },
      
       
    },
    
    
// {
//     name: 'authenticated', //npx playwright test --project=authenticated --headed
//     use: {
//      storageState: 'playwright/.auth/loginState.json',
//     },
//     testMatch:['**/End-End-LoginPage.spec.js'],
//   },
   

  {

  name:'apiTest',
  testDir:'./tests/api-tests',
  //dependencies:['Setup']

  }

  


  






    
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

