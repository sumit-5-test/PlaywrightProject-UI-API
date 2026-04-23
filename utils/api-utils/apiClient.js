

import { request } from '@playwright/test';

export async function createAPIClient() {
  return await request.newContext({
    baseURL: process.env.B_URL,
    extraHTTPHeaders: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    }
  });
}