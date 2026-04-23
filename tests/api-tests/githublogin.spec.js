

import { test, expect } from '@playwright/test';
import { createGitHubApiContext } from '../../utils/api-utils/githubHelper';

test('create github repository using api', async () => {
  const apiContext = await createGitHubApiContext();

  const response = await apiContext.get('/user/repos');
  expect(response.ok()).toBeTruthy();

  const repos = await response.json();
  console.log(repos);
});
