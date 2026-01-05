import { APIRequestContext, expect } from '@playwright/test';
import { ArticlePayload } from '../../datafactory/createArticlePayload';

export class ArticlesAPI {
  constructor(private api: APIRequestContext) {}

  async createArticle(article: ArticlePayload) {
    const response = await this.api.post('/api/articles', { data: { article } });
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async deleteArticle(slug: string) {
    const response = await this.api.delete(`/api/articles/${slug}`);
    expect(response.ok()).toBeTruthy();
  }

  async getArticle(slug: string) {
    return this.api.get(`/api/articles/${slug}`);
  }
}
