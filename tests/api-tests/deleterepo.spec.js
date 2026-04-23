import { test, expect, request } from '@playwright/test';
import { createGitHubApiContext } from '../../utils/api-utils/githubHelper';




test('delete github repository using api', async () => {
  const owner = 'sumit-5-test';
  const repoName = 'playwright-api-repo-1776786402614'; 

    const apiContext = await createGitHubApiContext();  
    //Delete
    const deleteResponse = await apiContext.delete(
      `/repos/${owner}/${repoName}`
    );

    expect(deleteResponse.status()).toBe(204);

    console.log('Deleted:', repoName);
}
);



