import { test as baseTest } from '../fixtures/pom-fixture';
import CryptoUtil from '../utils/ui-utils/CommonUtils';

export const test = baseTest.extend({
  cryptoUtil: async ({page}, use) => {
   const cryptoUtil=new CryptoUtil(page);
    await use(cryptoUtil);
  },
});

  
export { expect } from '@playwright/test';