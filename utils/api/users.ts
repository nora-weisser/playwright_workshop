import { APIRequestContext, expect } from '@playwright/test';

export class UsersAPI {
  constructor(private api: APIRequestContext) {}

  // Example: get a user's profile by username
  async getProfile(username: string) {
    const response = await this.api.get(`/api/profiles/${username}`);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  // Placeholder for future user-related endpoints (create, update, etc.)
}
