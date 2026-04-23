import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { createAPIClient } from '../../utils/api-utils/apiClient.js';
import { users } from '../../testData/apitestData/users.js';
import { userSchema } from '../../schema/userSchema.js';
import { log } from '../../utils/api-utils/logger.js';

const ajv = new Ajv();
const validate = ajv.compile(userSchema);

test.describe('GitHub Users API - Data Driven + Schema', () => {

  for (const data of users) {

    test(`Validate user API for: ${data.username}`, async () => {

      const api = await createAPIClient();

      log(`Sending request for user: ${data.username}`);

      const response = await api.get(`/users/${data.username}`);

      expect(response.status()).toBe(data.expectedStatus);

      if (data.expectedStatus === 200) {
        const body = await response.json();

        const valid = validate(body);
        expect(valid).toBe(true);

        expect(body.login).toBe(data.username);

        log(`Validated schema and data for: ${data.username}`);
      }
    });

  }

});