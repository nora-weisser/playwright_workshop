import { expect } from '@playwright/test';
import { test } from '../fixtures/test-options';
import { getArticlePayload } from '../models/payloads/createArticlePayload';
import { faker } from '@faker-js/faker';

test.describe('Article Management', () => {
  let slug: string;

  test.afterEach(async ({ apiHandler }) => {
    await apiHandler.articlesAPI.deleteArticle(slug);
    slug = undefined!;
  });

  test('Create Article', async ({ page, pages }) => {
    
    const articlePayload = getArticlePayload();
    await pages.articlesPage.gotoEditor();
    await pages.articlesPage.fillArticleForm(articlePayload);
    await pages.articlesPage.publish();

    await pages.articlesPage.expectHeading(articlePayload.title);
    await pages.articlesPage.expectArticleContentContains(articlePayload.body);

    slug = page.url().split('/article/')[1];
  });

  test('Edit Article', async ({ page, pages, apiHandler }) => {
    const articlePayload = getArticlePayload();
    const updatedBody = faker.lorem.lines(3);

    const response = await apiHandler.articlesAPI.createArticle(articlePayload);
    slug = response.article.slug;

    await page.goto(`/article/${slug}`);
    await pages.articlesPage.clickEditArticle();
    await pages.articlesPage.body.fill(updatedBody);
    await pages.articlesPage.publish();

    await pages.articlesPage.expectArticleContentContains(updatedBody);
  });

  test('Delete Article', async ({ page, pages, apiHandler }) => {
    const articlePayload = getArticlePayload();
    const response = await apiHandler.articlesAPI.createArticle(articlePayload);
    slug = response.article.slug;

    await page.goto(`/article/${slug}`);
    await pages.articlesPage.deleteArticle();

    await expect(page).toHaveURL('/');
    const getResponse = await apiHandler.articlesAPI.getArticle(slug);
    expect(getResponse.status()).toBe(404);

    slug = undefined!;
  });
});
