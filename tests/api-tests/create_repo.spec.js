

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

  const response = await apiContext.post('/user/repos', {
    data: {
      name: `playwright-api-repo-${Date.now()}`, // avoid 422 conflicts
      description: 'Repo created via Playwright API',
      private: false,
    },
  });

  expect(response.status(), await response.text()).toBe(201);

  const body = await response.json();
  console.log('Repo URL:', body.html_url);
});