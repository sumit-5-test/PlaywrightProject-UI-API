import { expect } from '@playwright/test';

export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('span.p-nickname');
        this.repositoriesTab = this.page.getByRole('link', { name: /^Repositories/ });
        this.profileName = page.locator('h1 span').first();
        this.profileLocation = page.locator('li[itemprop="homeLocation"] span.p-label');

    }
//users details urls
    async gotoProfile(url) {
        await this.page.goto(url);
    }


    async validationProfile(data) {
        await expect(this.username).toHaveText(data.expectedUsername);
        await expect(this.repositoriesTab).toBeVisible();
        await expect(this.profileName).toHaveText(data.expectedName);
        await expect(this.profileLocation).toHaveText(data.expectedLocation);
        await expect(this.repositoriesTab).toHaveText(data.expectedTab);
    }

}