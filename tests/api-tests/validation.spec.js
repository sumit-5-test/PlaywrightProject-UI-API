import { test, expect } from '@playwright/test';
import { createGitHubApiContext } from '../../utils/api-utils/githubHelper';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.USERNAME;

test.describe('Github user Apis testing', () => {

  //  1. Public User (No Auth) - Positive
  test('Get public user details', async ({ request }) => {
    const response = await request.get(`/users/${username}`);
     

  });

  // 2. Public User - Negative (wrong user)
  test('Get user with invalid username', async ({ request }) => {
    const response = await request.get(`/users/invalid_user_12345`);
    expect(response.status()).toBe(404);
  });

  // 3. Authenticated User (With Token)
  test.only('Get authenticated user details', async ({ request }) => {
    const response = await request.get('/user', {
      headers: headers
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    //console.log(body)
    expect(body.login).toBeTruthy();
  });

  // 4. Authenticated User without token
  test('Get authenticated user without token', async ({ request }) => {
    const response = await request.get('/user');
    expect(response.status()).toBe(401);
  });

  // 5. List Repos (With Auth)
  test('List repositories of authenticated user', async ({ request }) => {
    const response = await request.get('/user/repos', {
      headers: headers
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  // 6. Repo details invalid
  test('Get invalid repository details', async ({ request }) => {
    const response = await request.get(`/repos/${username}/invalid-repo`);
    expect(response.status()).toBe(404);
  });

  //  7. Repo details valid (public)
  test('Get repository details', async ({ request }) => {
    const response = await request.get(`/repos/${username}/Hello-World`);

   // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(body.name).toBe('Hello-World');
  });

});