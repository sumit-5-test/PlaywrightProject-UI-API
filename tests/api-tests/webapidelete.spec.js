import { test, expect, request } from '@playwright/test';
 
test('create repo → validate in UI → delete via API', async ({ page }) => {
   
  expect(process.env.GITHUB_TOKEN).toBeTruthy();
  expect(process.env.USERNAME).toBeTruthy();

  const repoName = `pw-repo-${Date.now()}`;
  const owner = process.env.USERNAME;

  const apiContext = await request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  //   CREATE (API)  
  const createRes = await apiContext.post('/user/repos', {
    data: {
      name: repoName,
      private: false,
      description: 'Created by Playwright API test',
    },
  });

  expect(createRes.status(), await createRes.text()).toBe(201);
  const repo = await createRes.json();

  //   VALIDATE (UI) 
  await page.goto(repo.html_url);
  await expect(page).toHaveURL(repo.html_url);

  // -------  DELETE (API)  
  const deleteRes = await apiContext.delete(`repos/${owner}/${repoName}`);
  expect(deleteRes.status(), await deleteRes.text()).toBe(204);
});
