import { test,expect } from "../../fixtures/hooks-fixture";
import loginmoduledata from  '../../testData/login-module-data.json';
 
//making 0 for this test file
test.use({storageState:{

    cookies:[],
    origins:[]
}

})

//Functional Test Cases
test.skip('TC-01 : Login with valid username and password @functional ',async({goto,loginPage,cryptoUtil,page})=>{
const username=cryptoUtil.decryptData(process.env.GITHUB_USER)
const password=cryptoUtil.decryptData(process.env.GITHUB_PASS)
await loginPage.login(username,password)
await expect(page.getByTestId('github-avatar')).toBeVisible();
})


test.only('TC-02 : Case sensitivity check for username @functional @UAT',async({goto,loginPage,cryptoUtil,page})=>{
const password=cryptoUtil.decryptData(process.env.GITHUB_PASS)
await loginPage.login(loginmoduledata.validUser.USERNAME_CASE,password)
await expect(page.getByTestId('github-avatar')).toBeVisible();
})

test('TC-03 : Login with valid email and password @functional',async({goto,loginPage,cryptoUtil,page})=>{
const password=cryptoUtil.decryptData(process.env.GITHUB_PASS)
await loginPage.login(loginmoduledata.validUser.useremail,password)
await expect(page.getByTestId('github-avatar')).toBeVisible();
})

//Negative Test Cases
 
test.only('TC-04 : Login with invalid password @negative @functional',async({goto,loginPage,cryptoUtil,page})=>{
const username=cryptoUtil.decryptData(process.env.GITHUB_USER)
await loginPage.login(username,loginmoduledata.invalidUser.password)
await expect(loginPage.errorMsg).toHaveText(loginmoduledata.invalidUser.invalid_credential_text);

})

test.only('TC-05 : Login with invalid username @negative @UAT',async({goto,loginPage,cryptoUtil})=>{
const  password=cryptoUtil.decryptData(process.env.GITHUB_PASS)
await loginPage.login(loginmoduledata.invalidUser.username,password)
await expect(loginPage.errorMsg).toHaveText(loginmoduledata.invalidUser.invalid_credential_text);

})

test.only('TC-06 : Login with invalid username and invalid password @negative @functional',async({goto,loginPage,cryptoUtil})=>{
await loginPage.login(loginmoduledata.invalidUser.username, loginmoduledata.invalidUser.password)
await expect(loginPage.errorMsg).toHaveText(loginmoduledata.invalidUser.invalid_credential_text);

})

test('TC-07 : Login with empty username and  password @negative @UAT ',async({goto,loginPage,cryptoUtil,page})=>{

// Click Sign in without entering username or passwor
await loginPage.signInBtn.click();

//Assert username field is invalid (required validation)
//Always store the result of evaluate() and assert on that value.
//HTML5 required‑field validation that GitHub uses

const isUsernameValid=await loginPage.username.evaluate(el => el.checkValidity());

expect(isUsernameValid).toBeFalsy();

//Assert password field is also require
const isPasswordRequired=await loginPage.password.evaluate(el => el.hasAttribute('required'));

expect(isPasswordRequired).toBeTruthy();


})

//Security Test Cases

test('TC-8: Password masking @security',async({goto,loginPage,cryptoUtil,page})=>{
await loginPage.login(loginmoduledata.invalidUser.emptyusername, loginmoduledata.invalidUser.password)
await expect(loginPage.password).toHaveAttribute('type', 'password')
})

 
 