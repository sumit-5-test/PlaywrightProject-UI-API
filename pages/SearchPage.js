import{test,expect} from '@playwright/test'
export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.getByText('Type / to search', { exact: true });
    this.searchInput = page.locator('#query-builder-test:visible');
    this.repoTab =  page.locator('#_R_9sraqdb_--label');
    this.noResultText =page.locator('span').filter({ hasText: '0 results' }).first();
  }
 
  async search(text) {
    await this.searchBox.click();
    if (text) {
      await this.searchInput.fill(text);
      await this.page.keyboard.press('Enter');
    }
  }
}