import { request } from '@playwright/test';

export async function getAPIResponse(url) {
  const apiContext = await request.newContext();
  const response = await apiContext.get(url);
  return response;
}