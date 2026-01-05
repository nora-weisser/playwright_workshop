import { APIRequestContext } from '@playwright/test';
import { APIHandler } from './api/APIHandler';

export async function cleanupArticle(
  request: APIRequestContext,
  slug?: string
) {
  if (!slug) return;
  const api = new APIHandler(request);
  await api.articlesAPI.deleteArticle(slug);
}