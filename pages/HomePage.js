export class HomePage {

  constructor(page) {
    this.page = page;
   // this.profileIcon =page.getByRole('img', { name: 'User avatar' });
     this.profileIcon=page.getByRole('img', { name: 'sumit tirpude' })
   // this.homeText=page.getByText('Home', { exact: true });
    this.homeText=page.getByRole('heading', { name: 'Home' });
    //await expect(page.getByRole('img', { name: 'User avatar' })).toBeVisible();
    this.logoutBtn = page.getByText('Sign out', { exact: true })

    //github features
    // Search

    this.searchButton = page.getByRole('button', { name: /search or jump to/i });
    this.searchTextbox = page.getByRole('textbox', { name: 'Find a repository…' })
    this.searchResult=page.getByRole('heading', { name: /search results/i })

    
    // User menu
    this.userAvatar = page.getByTestId('github-avatar')
    this.userMenu = page.getByRole('dialog', { name: 'User navigation' });
    this.signOutButton = page.locator('button:has-text("Sign out")');
    // Repository section
    this.newRepositoryButton = page.locator('span.Button-label:visible');
    this.repositoryList = page.locator('.repo-list-item');
    // Feed
    this.dashboardFeed = page.locator('.news');
    this.recentActivity = page.locator('.js-news-feed');

     }
 
  async verifyHomePage() {
   await this.page.waitForURL('https://github.com/');
   return await this.homeText.isVisible();
   
   
  }
 
  async logout() {
    await this.profileIcon.click();
    await this.logoutBtn.click();
  }

//home page actions

 async searchRepository(repoName) {
  await this.searchButton.click();
  await this.searchTextbox.fill(repoName)
    
   await this.searchTextbox.press('Enter');
     
  }

  async openUserMenu() {
    await this.userAvatar.click();
     
  }
  async isFeedVisible() {
    return await this.dashboardFeed.isVisible();
  }


  
 
  async createNewRepository() {
    await this.newRepositoryButton.click();
  }
 
  async getRepositoryCount() {
    return await this.repositoryList.count();
  }

}