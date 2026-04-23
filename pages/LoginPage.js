export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#login_field")
    this.password = page.locator("#password")
    this.signInBtn =page.locator('[name="commit"]');
    this.errorMsg = page.getByText('Incorrect username or password.')
  }
 
  async goto() {
    await this.page.goto('https://github.com/login');
  }
 
  // async login(user, pass) {
  //   await this.username.fill(user);
  //   await this.password.fill(pass);
  //   await this.signInBtn.click();
  // }

  async login(user, pass) {
    await this.username.evaluate((el, val) => {
               el.value = val;
               el.dispatchEvent(new Event('input', { bubbles: true }));
            }, user);
    await this.password.evaluate((el, val) => {
               el.value = val;
               el.dispatchEvent(new Event('input', { bubbles: true }));
            }, pass);
    await this.signInBtn.click();
  }

}

 