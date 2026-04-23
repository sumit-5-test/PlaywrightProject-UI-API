import { request, expect } from '@playwright/test';

export async function createGitHubApiContext() {
  expect(
    process.env.GITHUB_TOKEN,
    'GITHUB_TOKEN must be set'
  ).toBeTruthy();

  return await request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
}
