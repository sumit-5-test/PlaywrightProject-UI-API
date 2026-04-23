import { test, expect, request } from '@playwright/test';
import { createGitHubApiContext } from '../../utils/api-utils/githubHelper';

test('Dynamic CRUD operations using Playwright API', async () => {

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = 'sumit-5-test';

  // Generate dynamic data
  const repoName = `playwright-javascript-${Date.now()}`;
  const initialDescription = 'Repo created dynamically';
  const updatedDescription = 'Repo updated dynamically';

  const apiContext = await createGitHubApiContext();
  // Create a new repository
  const createResponse = await apiContext.post('/user/repos', {
    data: {
      name: repoName,
      description: initialDescription,
      private: false
    }
  });

  expect(createResponse.status()).toBe(201);
  console.log(` CREATE: ${repoName}`);

  // Read the repository details
  const readResponse = await apiContext.get(
    `/repos/${OWNER}/${repoName}`
  );

  expect(readResponse.status()).toBe(200);
  const readBody = await readResponse.json();
  expect(readBody.description).toBe(initialDescription);
  console.log('READ: Repo details verified');

  // Update the repository description
  const updateResponse = await apiContext.patch(
    `/repos/${OWNER}/${repoName}`,
    {
      data: {
        description: updatedDescription
      }
    }
  );

  expect(updateResponse.status()).toBe(200);
  console.log('UPDATE: Repo updated');

  //delete  
  const deleteResponse = await apiContext.delete(
    `/repos/${OWNER}/${repoName}`
  );

  expect(deleteResponse.status()).toBe(204);
  console.log(' DELETE: Repo deleted');

  // Verify deletion
  const verifyResponse = await apiContext.get(
    `/repos/${OWNER}/${repoName}`
  );

  expect(verifyResponse.status()).toBe(404);
  console.log(' VERIFIED: Repo no longer exists');
});