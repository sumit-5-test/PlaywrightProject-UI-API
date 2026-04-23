import { test, expect, request } from '@playwright/test';
import { createGitHubApiContext } from '../../utils/api-utils/githubHelper';

test('create and delete github repository using api', async () => {
  // Fail fast if token is missing
  // expect(
  //   process.env.GITHUB_TOKEN,
  //   'GITHUB_TOKEN must be set with repo permissions'
  // ).toBeTruthy();

  const owner = 'sumit-5-test';
  const repoName = `playwright-api-repo-${Date.now()}`;

  const apiContext = await createGitHubApiContext();


  // const apiContext = await request.newContext({
  //   baseURL: 'https://api.github.com',
  //   extraHTTPHeaders: {
  //     Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  //     Accept: 'application/vnd.github+json',
  //     'X-GitHub-Api-Version': '2022-11-28',
  //   },
  // })

  //create
  const createResponse = await apiContext.post('/user/repos', {
    data: {
      name: repoName,
      description: 'Repo created by Playwright API test',
      private: false,
    },
  });

  expect(createResponse.status(), await createResponse.text()).toBe(201);

  const repo = await createResponse.json();
  expect(repo.name).toBe(repoName);

  console.log('Created:', repo.html_url);

  //Delete
  const deleteResponse = await apiContext.delete(
    `/repos/${owner}/${repoName}`
  );

  expect(deleteResponse.status()).toBe(204);

  console.log('Deleted:', repoName);
});