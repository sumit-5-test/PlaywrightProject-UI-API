import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import { SearchPage } from '../../pages/SearchPage';
 
// Read Excel file
const workbook = XLSX.readFile('testData/searchValidation.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
 
// Convert Excel data to JSON
const testData = XLSX.utils.sheet_to_json(sheet);
 
test.describe('DDT using Excel', () => {
 
   for (const row of testData) {
       test(`Search validation: ${row.searchText}`, async ({ page }) => {
         const search = new SearchPage(page);
         await page.context().addCookies(require('../../playwright/.auth/loginState.json').cookies);
    
         await page.goto('https://github.com'); // storageState login
    
         await search.search(row.searchText);
    
         if (!row.searchText) {
           await expect(search.searchBox).toBeVisible();
         } else if  (row.expectedResult.includes('0 results')) {
           await expect(search.noResultText).toBeVisible();
         } 
        else {
            await expect(search.repoTab).toBeVisible();
         }
       });
     }
 
});