 
import CryptoUtil from '../../utils/ui-utils/CommonUtils';
import { test } from '@playwright/test';
 
test('Use encryption in test', async () => {
 // const text = process.env.SECRET_KEY;

 const cryptoUtil=new CryptoUtil();
  const username="sunil";
  const password="sunil@123"

  
  const sKey=process.env.SECRET_KEY
 
  const encrypted = cryptoUtil.encryptData(username);
  console.log('Encrypted:', encrypted);
 
  const decrypted = cryptoUtil.decryptData(encrypted);
  console.log('Decrypted:', decrypted);
})