import { expect } from '@playwright/test';
import cryptoUtil from '../utils/ui-utils/CommonUtils';
//import { decryptData } from '../utils/CommonUtils.js';

const cryPto=new cryptoUtil();

export class RepoPage {
  constructor(page) {
    this.page = page;
    // this.newRepoBtn = page.getByRole('link', { name: 'New' });
    this.newRepoBtn = page.locator('span.Button-label:visible');
    this.repoName = page.getByLabel('Repository name*', { exact: true });
    this.createRepoBtn = page.getByRole('button', { name: 'Create repository' });

    //delete repo locators
    this.settingsTab = page.getByRole('tab', { name: 'Settings' });
    this.deleteRepoBtn = page.locator("//span[contains(text(),'Delete this repository')]");
    this.confirmDeleteBtn = page.getByText('I want to delete this repository', { exact: true });
    this.declareDeleteBtn = page.getByText('I have read and understand these effects', { exact: true });
    this.confirmRepoNameInput = page.locator('[name="verification_field"]')
    this.deletewithnameBtn = page.locator('span').filter({ hasText: 'Delete this repository' }).last();
    this.finalPass =page.getByRole('textbox', { name: 'Password' })
    this.confirmFinalDeleteBtn = page.getByRole('button', { name: 'Confirm' })
  }

  async createRepository(repo) {
    await this.newRepoBtn.click();
    await this.repoName.fill(repo);
    await this.createRepoBtn.click();
  }

  async deleteRepository(owner, name) {
    //await this.page.goto(`https://github.com/${owner}/${name}`);
    //await this.settingsTab.click();
    await this.page.goto(`https://github.com/${owner}/${name}/settings`);

    //`https://github.com/${owner}/${name}/settings`

    // Ensure we are on the settings page
    await expect(this.page).toHaveURL(
      new RegExp(`/${owner}/${name}/settings`)
    );

    // Scroll to Danger Zone
    const dangerZone = this.page.getByRole('heading', { name: 'Danger Zone' });
    // await dangerZone.scrollIntoViewIfNeeded();

    // Delete repository
    const deleteButton = this.page.getByRole('button', {
      name: 'Delete this repository'
    });

    //await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    await this.confirmDeleteBtn.click();
    await this.declareDeleteBtn.click();

    await this.confirmRepoNameInput.fill(`${owner}/${name}`);
    await this.deletewithnameBtn.click();
    const dpassword = cryPto.decryptData(process.env.GITHUB_PASS)
    //await this.finalPass.fill(dpassword);
    //await this.confirmFinalDeleteBtn.click();
  }

}
