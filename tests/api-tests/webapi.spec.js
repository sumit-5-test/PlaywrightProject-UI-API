 

import { test, expect, request } from '@playwright/test';

test('github api auth using token', async ({page}) => {
  const apiContext = await request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  const response = await apiContext.get('/user');
  expect(response.ok()).toBeTruthy();
});
