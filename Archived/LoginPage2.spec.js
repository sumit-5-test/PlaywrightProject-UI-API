
import {test} from '../fixtures/hooks-fixture';

// test.beforeEach('Before each hook',async({loginPage})=>{
//     await loginPage.goto();
// })

// test.afterEach('After each hook',async({homePage})=>{

//await homePage.logout();

// })

    test('Temp test 1', async ({ page,goto}) => {
     
       
       console.log(await page.title());
 
    });

    test('Temp test 2',async({page,goto})=>{
   
     console.log(await page.title());

    })

    test('Temp test 3',async({page,goto,logout})=>{
     console.log(await page.title());

    })

