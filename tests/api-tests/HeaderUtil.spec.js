

import { test, expect, request } from '@playwright/test';

test('create github repository using api', async () => {
  expect(process.env.GITHUB_TOKEN, 'GITHUB_TOKEN must be set').toBeTruthy();

  const apiContext = await request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const response = await apiContext.get('/user/repos');
 //console.log(await response.json());
});