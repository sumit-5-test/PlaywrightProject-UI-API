import { test, expect } from '@playwright/test';
import { createGitHubApiContext } from '../../utils/api-utils/githubHelper';

test('Delete already created GitHub repo', async () => {

  const OWNER = 'sumit-5-test';
  const repoName = 'pw-repo-1776790571855'; // must already exist

  const apiContext = await createGitHubApiContext();

  // DELETE repo
  const deleteResponse = await apiContext.delete(
    `/repos/${OWNER}/${repoName}`
  );

  expect(deleteResponse.status()).toBe(204);
  console.log(`✅ Deleted repo: ${repoName}`);

  // VERIFY deletion
  const verifyResponse = await apiContext.get(
    `/repos/${OWNER}/${repoName}`
  );

  expect(verifyResponse.status()).toBe(404);
  console.log('✅ Verified: Repo no longer exists');
});








  